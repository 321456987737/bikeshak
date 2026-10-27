"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ACCESSORY_CATEGORIES } from "@/lib/accessory-categories";

const MAX_IMAGES = 15;

export default function AccessoryForm({ initialData = null }) {
  const router = useRouter();
  const isEdit = Boolean(initialData?._id);
  const [form, setForm] = useState(() => ({
    name: initialData?.name || "",
    stockNumber: initialData?.stockNumber || "",
    category: initialData?.category || ACCESSORY_CATEGORIES[0].value,
    description: initialData?.description || "",
    price: initialData?.price == null ? "" : String(initialData.price),
    currency: initialData?.currency || "SAR",
    stockQuantity:
      initialData?.stockQuantity == null
        ? "0"
        : String(initialData.stockQuantity),
    status: initialData?.status || "Available",
    isFeatured: Boolean(initialData?.isFeatured),
  }));
  const [images, setImages] = useState(() =>
    (initialData?.images || []).map((image, index) => ({
      id: image.publicId || `existing-${index}`,
      url: image.url,
      publicId: image.publicId || "",
      alt: image.alt || "",
      preview: image.url,
      isExisting: true,
      file: null,
    })),
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const previewUrls = useRef(new Set());

  useEffect(
    () => () => {
      for (const url of previewUrls.current) URL.revokeObjectURL(url);
    },
    [],
  );

  function handleChange(event) {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleImageSelection(event) {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    setError("");

    const remaining = MAX_IMAGES - images.length;
    if (files.length > remaining) {
      setError(`You can add up to ${remaining} more images.`);
      return;
    }

    const invalidFile = files.find(
      (file) =>
        !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
        file.size > 10 * 1024 * 1024,
    );
    if (invalidFile) {
      setError("Choose JPG, PNG or WebP images smaller than 10MB each.");
      return;
    }

    setImages((current) => [
      ...current,
      ...files.map((file) => {
        const preview = URL.createObjectURL(file);
        previewUrls.current.add(preview);
        return {
          id: `${file.name}-${file.lastModified}-${file.size}`,
          url: "",
          publicId: "",
          alt: file.name,
          preview,
          isExisting: false,
          file,
        };
      }),
    ]);
  }

  function removeImage(index) {
    setImages((current) => {
      const image = current[index];
      if (image?.preview && !image.isExisting) {
        URL.revokeObjectURL(image.preview);
        previewUrls.current.delete(image.preview);
      }
      return current.filter((_, itemIndex) => itemIndex !== index);
    });
  }

  async function uploadNewImages() {
    const newImages = images.filter((image) => image.file && !image.isExisting);
    if (newImages.length === 0) return [];

    const formData = new FormData();
    formData.append("folder", "accessories");
    for (const image of newImages) formData.append("files", image.file);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to upload images");
    }
    return result.data.images || [];
  }

  async function deleteCloudinaryImages(publicIds) {
    if (publicIds.length === 0) return;
    const response = await fetch("/api/admin/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicIds }),
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to remove old images");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    let uploadedPublicIds = [];
    try {
      const price = Number(form.price);
      const stockQuantity = Number(form.stockQuantity);
      if (!form.name.trim()) throw new Error("Product name is required.");
      if (!Number.isFinite(price) || price < 0) {
        throw new Error("Enter a valid price.");
      }
      if (!Number.isInteger(stockQuantity) || stockQuantity < 0) {
        throw new Error("Stock quantity must be a whole number of zero or more.");
      }

      setSuccess("Uploading product images...");
      const uploadedImages = await uploadNewImages();
      uploadedPublicIds = uploadedImages
        .map((image) => image.publicId)
        .filter(Boolean);

      let uploadIndex = 0;
      const finalImages = images.map((image) => {
        if (image.isExisting) {
          return {
            url: image.url,
            publicId: image.publicId,
            alt: image.alt || form.name.trim(),
          };
        }
        const uploaded = uploadedImages[uploadIndex++];
        return {
          url: uploaded.url,
          publicId: uploaded.publicId,
          alt: form.name.trim(),
        };
      });

      const originalPublicIds = (initialData?.images || [])
        .map((image) => image.publicId)
        .filter(Boolean);
      const retainedPublicIds = finalImages
        .map((image) => image.publicId)
        .filter(Boolean);
      const removedPublicIds = originalPublicIds.filter(
        (publicId) => !retainedPublicIds.includes(publicId),
      );

      const payload = {
        ...form,
        name: form.name.trim(),
        stockNumber: form.stockNumber.trim(),
        description: form.description.trim(),
        currency: form.currency.trim().toUpperCase(),
        price,
        stockQuantity,
        images: finalImages,
      };
      const response = await fetch(
        isEdit ? `/api/admin/accessories/${initialData._id}` : "/api/admin/accessories",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to save accessory");
      }

      let cleanupWarning = "";
      try {
        await deleteCloudinaryImages(removedPublicIds);
      } catch (cleanupError) {
        console.error("Removed accessory image cleanup error:", cleanupError);
        cleanupWarning = " Some removed images could not be deleted.";
      }
      setSuccess(
        `${isEdit ? "Accessory updated" : "Accessory added"} successfully.${cleanupWarning}`,
      );
      window.setTimeout(() => {
        router.push("/admin/accessories");
        router.refresh();
      }, 700);
    } catch (submitError) {
      console.error("Accessory form submit error:", submitError);
      if (uploadedPublicIds.length > 0) {
        try {
          await deleteCloudinaryImages(uploadedPublicIds);
        } catch (cleanupError) {
          console.error("New accessory image cleanup error:", cleanupError);
        }
      }
      setSuccess("");
      setError(submitError.message || "Failed to save accessory.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-24">
      {error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}
      {success && (
        <p role="status" className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          {success}
        </p>
      )}

      <section className="space-y-5 rounded-2xl border border-black/10 bg-white p-5 sm:p-7">
        <div>
          <h2 className="text-lg font-semibold">Product information</h2>
          <p className="mt-1 text-sm text-black/45">Details shown in the public accessories catalog.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium">
            Product name
            <input name="name" value={form.name} onChange={handleChange} required maxLength={160} className="h-11 w-full rounded-xl border border-black/15 px-3 font-normal outline-none focus:border-black" />
          </label>
          <label className="space-y-2 text-sm font-medium">
            Category
            <select name="category" value={form.category} onChange={handleChange} className="h-11 w-full rounded-xl border border-black/15 bg-white px-3 font-normal outline-none focus:border-black">
              {ACCESSORY_CATEGORIES.map((category) => (
                <option key={category.value} value={category.value}>{category.label}</option>
              ))}
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium">
            Stock number
            <input name="stockNumber" value={form.stockNumber} onChange={handleChange} maxLength={80} className="h-11 w-full rounded-xl border border-black/15 px-3 font-normal outline-none focus:border-black" />
          </label>
          <label className="space-y-2 text-sm font-medium">
            Price
            <div className="flex gap-2">
              <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required className="h-11 min-w-0 flex-1 rounded-xl border border-black/15 px-3 font-normal outline-none focus:border-black" />
              <input name="currency" value={form.currency} onChange={handleChange} maxLength={3} aria-label="Currency code" className="h-11 w-20 rounded-xl border border-black/15 px-3 uppercase font-normal outline-none focus:border-black" />
            </div>
          </label>
          <label className="space-y-2 text-sm font-medium">
            Stock quantity
            <input name="stockQuantity" type="number" min="0" step="1" value={form.stockQuantity} onChange={handleChange} required className="h-11 w-full rounded-xl border border-black/15 px-3 font-normal outline-none focus:border-black" />
          </label>
          <label className="space-y-2 text-sm font-medium">
            Status
            <select name="status" value={form.status} onChange={handleChange} className="h-11 w-full rounded-xl border border-black/15 bg-white px-3 font-normal outline-none focus:border-black">
              <option>Available</option>
              <option>Out of stock</option>
              <option>Discontinued</option>
            </select>
          </label>
        </div>
        <label className="block space-y-2 text-sm font-medium">
          Description
          <textarea name="description" value={form.description} onChange={handleChange} maxLength={5000} rows={5} className="w-full rounded-xl border border-black/15 px-3 py-3 font-normal leading-6 outline-none focus:border-black" />
        </label>
        <label className="flex items-center gap-3 text-sm font-medium">
          <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} className="h-4 w-4 accent-black" />
          Feature this accessory
        </label>
      </section>

      <section className="space-y-5 rounded-2xl border border-black/10 bg-white p-5 sm:p-7">
        <div>
          <h2 className="text-lg font-semibold">Product images</h2>
          <p className="mt-1 text-sm text-black/45">Upload up to {MAX_IMAGES} JPG, PNG or WebP images (10MB each).</p>
        </div>
        <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-black/25 text-center text-sm hover:border-black">
          <span className="text-2xl">+</span>
          <span>Choose images</span>
          <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleImageSelection} className="sr-only" />
        </label>
        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {images.map((image, index) => (
              <div key={image.id} className="relative aspect-square overflow-hidden rounded-xl bg-black/5">
                <Image src={image.preview} alt={image.alt || form.name || "Accessory"} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" />
                <button type="button" onClick={() => removeImage(index)} aria-label={`Remove image ${index + 1}`} className="absolute right-2 top-2 rounded-full bg-black/75 px-2 py-1 text-xs text-white">Remove</button>
              </div>
            ))}
          </div>
        )}
      </section>
      <button type="submit" disabled={submitting} className="w-full rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white disabled:opacity-50 sm:w-auto">
        {submitting ? "Saving..." : isEdit ? "Save changes" : "Add accessory"}
      </button>
    </form>
  );
}
