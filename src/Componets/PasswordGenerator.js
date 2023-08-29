import React, { useReducer } from "react";
import { toast } from "react-hot-toast";
import { FaCopy } from "react-icons/fa6";
import { Fragment } from "react";
 
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LENGTH":
      return { ...state, length: action.payload };
    case "TOGGLE_INCLUDE_UPPERCASE":
      return { ...state, includeUppercase: !state.includeUppercase };
    case "TOGGLE_INCLUDE_NUMBERS":
      return { ...state, includeNumbers: !state.includeNumbers };
    case "TOGGLE_INCLUDE_SPECIAL_CHARS":
      return { ...state, includeSpecialChars: !state.includeSpecialChars };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

const PasswordGenerator = () => {
  const initialState = {
    password: "",
    length: 10,
    includeUppercase: true,
    includeNumbers: true,
    includeSpecialChars: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const generatePassword = () => {
    const { length, includeUppercase, includeNumbers, includeSpecialChars } = state;

   if (length <= 4) {
    toast.error("No Password (-_-)");
   }
   else {
     const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
     const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
     const numberChars = "0123456789";
     const specialChars = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";

     let allChars = lowercaseChars;
     if (includeUppercase) allChars += uppercaseChars;
     if (includeNumbers) allChars += numberChars;
     if (includeSpecialChars) allChars += specialChars;

     let generatedPassword = "";
     for (let i = 0; i < length; i++) {
       const randomIndex = Math.floor(Math.random() * allChars.length);
       generatedPassword += allChars.charAt(randomIndex);
     }

     dispatch({ type: "SET_PASSWORD", payload: generatedPassword });
     toast.success("Generator Password 😀");
    }
  };



  const copyPasswordToClipboard = () => {
    const passwordField = document.getElementById("password-field");
    if (!passwordField) {
      toast.error("Click Generator Button !");
    }
    else{
       passwordField.select();
       document.execCommand("copy");
       toast.success("Password Copy");
    }
  };

  return (
    <html lang="en">
      <title>PasswordGenerator</title>
      <body className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <section className="bg-white p-8 rounded-lg shadow-lg shadow-blue-300">
          <h1 className="select-none text-2xl font-semibold mb-4">
            Password Generator
          </h1>
          <section className="mb-4">
            <label className="select-none block mb-2 font-medium">
              Password Length Not use 1,2,3,4
            </label>
            <input
              type="number"
              className="w-full p-2 border-4 hover:border-x-black rounded-md"
              value={state.length}
              onChange={(e) =>
                dispatch({ type: "SET_LENGTH", payload: e.target.value })
              }
            />
          </section>

          {/* toggling includeUppercase, includeNumbers, and includeSpecialChars */}
          <section className="mb-4 select-none">
            <label className="flex items-center mb-2 font-medium">
              <input
                type="checkbox"
                className="mr-2 rounded focus:ring-2 focus:ring-blue-500"
                checked={state.includeUppercase}
                onChange={() => dispatch({ type: "TOGGLE_INCLUDE_UPPERCASE" })}
              />
              Include Uppercase
            </label>

            <label className="flex items-center mb-2 font-medium">
              <input
                type="checkbox"
                className="mr-2 rounded focus:ring-2 focus:ring-blue-500"
                checked={state.includeNumbers}
                onChange={() => dispatch({ type: "TOGGLE_INCLUDE_NUMBERS" })}
              />
              Include Numbers
            </label>

            <label className="flex items-center mb-2 font-medium">
              <input
                type="checkbox"
                className="mr-2 rounded focus:ring-2 focus:ring-blue-500"
                checked={state.includeSpecialChars}
                onChange={() =>
                  dispatch({ type: "TOGGLE_INCLUDE_SPECIAL_CHARS" })
                }
              />
              Include Special Characters
            </label>
          </section>

          <button
            className="select-none bg-orange-400 text-black px-6 py-2 border-2 rounded-md hover:border-x-orange-600 active:bg-orange-700"
            onClick={generatePassword}
          >
            GeneratePassword
          </button>

          {state.password && (
            <Fragment className="mt-4 p-2 bg-gray-200 rounded-md">
              <input
                type="text"
                id="password-field"
                readOnly
                value={state.password}
                className="w-full p-2 border rounded-md"
              />
            </Fragment>
          )}
          <button
            onClick={copyPasswordToClipboard}
            className="select-none mt-2 flex items-center gap-1 border-4 bg-green-500 text-black px-4 py-2 rounded-md hover:border-x-green-800 active:bg-green-600"
          >
            Copy Password
            <FaCopy />
          </button>
        </section>

        <toast position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}

export default PasswordGenerator;