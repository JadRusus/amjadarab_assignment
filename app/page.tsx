"use client";
import Image from "next/image";
import Navbar from "../components/Navbar";
import React, { useState } from "react";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string>("");
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  interface ExtractedData {
    surname: string;
    givenName: string;
    dob: string;
    nationality: string;
    documentNo: string;
    dateOfIssue: string;
    dateOfExpiry: string;
    sex: string;
  }

  const parseExtractedData = (text: string): ExtractedData => {
    const lines = text.split("\n");
    const data: Partial<ExtractedData> = {};

    lines.forEach((line) => {
      const [key, value] = line.split(":").map((s) => s.trim());
      switch (key.toLowerCase()) {
        case "surname":
          data.surname = value;
          break;
        case "givenname":
          data.givenName = value;
          break;
        case "date of birth":
          data.dob = value;
          break;
        case "nationality":
          data.nationality = value;
          break;
        case "document number":
          data.documentNo = value;
          break;
        case "date of issue":
          data.dateOfIssue = value;
          break;
        case "date of expiry":
          data.dateOfExpiry = value;
          break;
        case "sex":
          data.sex = value;
          break;
      }
    });

    return data as ExtractedData;
  };
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      setIsLoading(true);

      try {
        // Converting the file to base64
        const base64Image = await fileToBase64(file);

        // Calling GPT-4 Vision API
        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Analyze this image of an ID card and extract text based on these values: surname, givenName, date of birth, nationality, document Number, date Of Issue, date Of Expiry, sex. Note that the ID card can be in any language and you have to translate it to english and send the English text only without adding any other text to the response",
                },
                { type: "image_url", image_url: { url: base64Image } },
              ],
            },
          ],
        });
        const extractedText = response.choices[0]?.message?.content || "";
        const parsedData = parseExtractedData(extractedText);
        setExtractedData(parsedData);

        setAnalysisResult(
          response.choices[0]?.message?.content || "No analysis result"
        );
      } catch (error) {
        console.error("Error analyzing image:", error);
        setAnalysisResult("Error analyzing image");
        setExtractedData(null);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-4 bg-probgclr">
      <Navbar />
      <div className="mt-4 flex flex-row  max-lg:flex-col justify-between w-10/12 font-bold">
        <div className="flex flex-col max-lg:w-full w-2/4">
          <form className="space-y-4 max-sm:pr-0 pr-24">
            <div className="flex flex-row max-sm:flex-col max-md:justify-between">
              <div className="flex flex-col space-y-4 mr-10 max-sm:mr-0">
                <label className="block">
                  <span className="text-profontclr">
                    Surname <span className="text-red-400">*</span>
                  </span>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    placeholder="Surname"
                    value={extractedData ? extractedData.surname : ""}
                    className="mt-1 block w-full h-8 bg-probgclr border-2 border-profontclr rounded-md shadow-sm px-2 py-6 text-proaccclr placeholder:text-profontclr"
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
                    placeholder="Given Name"
                    value={extractedData ? extractedData.givenName : ""}
                    className="mt-1 block w-full h-8 bg-probgclr border-2 border-profontclr rounded-md shadow-sm px-2 py-6 text-proaccclr placeholder:text-profontclr"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-profontclr">
                    Date of Birth <span className="text-red-400">*</span>
                  </span>
                  <input
                    type="text"
                    id="dob"
                    name="dob"
                    placeholder="Date of Birth"
                    value={extractedData ? extractedData.dob : ""}
                    className="mt-1 block w-full h-8 bg-probgclr border-2 border-profontclr rounded-md shadow-sm px-2 py-6 text-proaccclr placeholder:text-profontclr"
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
                    placeholder="Nationality"
                    value={extractedData ? extractedData.nationality : ""}
                    className="mt-1 block w-full h-8 bg-probgclr border-2 border-profontclr rounded-md shadow-sm px-2 py-6 text-proaccclr placeholder:text-profontclr"
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
                    placeholder="Document No."
                    value={extractedData ? extractedData.documentNo : ""}
                    className="mt-1 block w-full h-8 bg-probgclr border-2 border-profontclr rounded-md shadow-sm px-2 py-6 text-proaccclr placeholder:text-profontclr"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-profontclr">
                    Date of Issue <span className="text-red-400">*</span>
                  </span>
                  <input
                    type="text"
                    id="dateOfIssue"
                    name="dateOfIssue"
                    placeholder="Date of Issue"
                    value={extractedData ? extractedData.dateOfIssue : ""}
                    className="mt-1 block w-full h-8 bg-probgclr border-2 border-profontclr rounded-md shadow-sm px-2 py-6 text-proaccclr placeholder:text-profontclr"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-profontclr">
                    Date of Expiry <span className="text-red-400">*</span>
                  </span>
                  <input
                    type="text"
                    id="dateOfExpiry"
                    name="dateOfExpiry"
                    placeholder="Date of Expiry"
                    value={extractedData ? extractedData.dateOfExpiry : ""}
                    className="mt-1 block w-full h-8 bg-probgclr border-2 border-profontclr rounded-md shadow-sm px-2 py-6 text-proaccclr placeholder:text-profontclr"
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
                    placeholder="Sex"
                    value={extractedData ? extractedData.sex : ""}
                    className="mt-1 block w-full h-8 bg-probgclr border-2 border-profontclr rounded-md shadow-sm px-2 py-6 text-proaccclr placeholder:text-profontclr"
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
        <div className="flex flex-col max-lg:w-full max-lg:mt-6 w-2/4  max-sm:pr-0  pr-24">
          <h2 className="text-profontclr  mb-4">Upload your ID card</h2>
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
          {isLoading && <p className="text-proaccclr">Analyzing image...</p>}
        </div>
      </div>
    </main>
  );
}
