import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-4 bg-probgclr">
      <Navbar />
      <div className="mt-4 flex flex-row justify-between w-10/12">
        <div className="flex flex-col w-2/4">
          <form className=" w-10/12 space-y-4 font-bold">
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
                    placeholder="Surname"
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
                    placeholder="Given Name"
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
                    placeholder="Date of Birth"
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
                    placeholder="Nationality"
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
                    placeholder="Document No."
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
                    placeholder="Date of Issue"
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
                    placeholder="Date of Expiry"
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
                    placeholder="Sex"
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
        <div className="flex flex-col w-2/4">test</div>
      </div>
    </main>
  );
}
