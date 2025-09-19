"use client";

import { useState } from "react";
import Link from "next/link";

type ConverterFormProps = {
  fromFormat: string;
  toFormat: string;
};

export const ConverterForm = ({ fromFormat, toFormat }: ConverterFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(80); // New state for image quality, default to 80
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setDownloadUrl(null);
      setError(null);
    }
  };

  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuality(parseInt(e.target.value, 10));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fromFormat", fromFormat);
    formData.append("toFormat", toFormat);
    formData.append("quality", quality.toString()); // Append the quality value

    try {
      const res = await fetch("/api/convert", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Conversion failed");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError("An error occurred during conversion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-xl text-white">
      {/* Back to Home Link */}
      <Link
        href="/"
        className="self-start mb-4 text-blue-400 hover:text-blue-200 transition-colors"
      >
        &larr; Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-4">
        {fromFormat.toUpperCase()} to {toFormat.toUpperCase()} Converter
      </h1>
      <p className="text-gray-400 mb-6">
        Select a {fromFormat.toUpperCase()} file to convert.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          type="file"
          accept={`image/${fromFormat}`}
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        {file && (
          <p className="mt-2 text-sm text-gray-400">
            Selected file: {file.name}
          </p>
        )}

        {/* Quality/Compression Input */}
        <div className="mt-4 w-full">
          <label
            htmlFor="quality"
            className="block text-sm font-medium text-gray-400"
          >
            Image Quality: {quality}%
          </label>
          <input
            type="range"
            id="quality"
            name="quality"
            min="1"
            max="100"
            value={quality}
            onChange={handleQualityChange}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className={`mt-6 w-full py-2 px-4 rounded-md font-semibold transition-colors
            ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          disabled={!file || loading}
        >
          {loading ? "Converting..." : "Convert"}
        </button>
      </form>
      {error && <p className="mt-4 text-red-400">{error}</p>}
      {downloadUrl && (
        <a
          href={downloadUrl}
          download={`converted-image.${toFormat}`}
          className="mt-6 py-2 px-4 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700"
        >
          Download Converted Image
        </a>
      )}
    </div>
  );
};
