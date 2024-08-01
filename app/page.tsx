"use client";
import Image from "next/image";
import Navbar from "../components/Navbar";
import React, { useState } from "react";
import Tesseract from "tesseract.js";

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);

      try {
        const result = await Tesseract.recognize(file);
        setExtractedText(result.data.text);
      } catch (error) {
        console.error("Error performing OCR:", error);
        setExtractedText("Error extracting text from image");
      }
    }
  };
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-4 bg-probgclr">
      <Navbar />
      <div className="mt-4 flex flex-row justify-between w-10/12 font-bold">
        <div className="flex flex-col w-2/4">
          <form className=" w-10/12 space-y-4 ">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col space-y-4">
                <label className="block">
                  <span className="text-profontclr">
                    Surname <span className="text-red-400">*</span>
                  </span>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    // placeholder={fields.surname || "Surname"}
                    className="mt-1 block w-full h-8 bg-probgclr border-2 border-profontclr rounded-md shadow-sm px-2 py-6 text-proaccclr placeholder-proaccclr"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-profontclr">
                    Given Name <span className="text-red-400">*</span>
                  </span>
                  <input
                    type="text"
                    id="givenName"
                    name="givenName"
                    // placeholder={fields.givenName || "Given Name"}
                    className="mt-1 block w-full h-8 bg-probgclr border-2 border-profontclr rounded-md shadow-sm px-2 py-6 text-proaccclr placeholder-proaccclr"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-profontclr">
                    Date of Birth <span className="text-red-400">*</span>
                  </span>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    // placeholder={fields.dob || "Date of Birth"}
                    className="mt-1 block w-full h-8 bg-probgclr border-2 border-profontclr rounded-md shadow-sm px-2 py-6 text-proaccclr placeholder-proaccclr"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-profontclr">
                    Nationality <span className="text-red-400">*</span>
                  </span>
                  <input
                    type="text"
                    id="nationality"
                    name="nationality"
                    // placeholder={fields.nationality || "Nationality"}
                    className="mt-1 block w-full h-8 bg-probgclr border-2 border-profontclr rounded-md shadow-sm px-2 py-6 text-proaccclr placeholder-proaccclr"
                    required
                  />
                </label>
              </div>
              <div className="flex flex-col space-y-4">
                <label className="block">
                  <span className="text-profontclr">
                    Document No. <span className="text-red-400">*</span>
                  </span>
                  <input
                    type="text"
                    id="documentNo"
                    name="documentNo"
                    // placeholder={fields.documentNo || "Document No."}
                    className="mt-1 block w-full h-8 bg-probgclr border-2 border-profontclr rounded-md shadow-sm px-2 py-6 text-proaccclr placeholder-proaccclr"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-profontclr">
                    Date of Issue <span className="text-red-400">*</span>
                  </span>
                  <input
                    type="date"
                    id="dateOfIssue"
                    name="dateOfIssue"
                    // placeholder={fields.dateOfIssue || "Date of Issue"}
                    className="mt-1 block w-full h-8 bg-probgclr border-2 border-profontclr rounded-md shadow-sm px-2 py-6 text-proaccclr placeholder-proaccclr"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-profontclr">
                    Date of Expiry <span className="text-red-400">*</span>
                  </span>
                  <input
                    type="date"
                    id="dateOfExpiry"
                    name="dateOfExpiry"
                    // placeholder={fields.dateOfExpiry || "Date of Expiry"}
                    className="mt-1 block w-full h-8 bg-probgclr border-2 border-profontclr rounded-md shadow-sm px-2 py-6 text-proaccclr placeholder-proaccclr"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-profontclr">
                    Sex <span className="text-red-400">*</span>
                  </span>
                  <input
                    type="text"
                    id="sex"
                    name="sex"
                    // placeholder={fields.sex || "Sex"}
                    className="mt-1 block w-full h-8 bg-probgclr border-2 border-profontclr rounded-md shadow-sm px-2 py-6 text-proaccclr placeholder-proaccclr"
                    required
                  />
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="flex flex-col w-2/4">
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            className="file:w-full file:bg-blue-500 file:text-white file:py-2 file:px-4 file:rounded-md file:hover:bg-blue-700 file:focus:outline-none file:focus:bg-blue-700 mb-4"
          />
          {uploadedImage && (
            <Image
              src={uploadedImage}
              alt="Uploaded Image"
              width={550}
              height={550}
              objectFit="contain"
              className="text-white "
            />
          )}
          {extractedText && (
            <div className="mt-4">
              <h3 className="text-profontclr font-bold">Extracted Text:</h3>
              <p className="text-proaccclr">{extractedText}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
