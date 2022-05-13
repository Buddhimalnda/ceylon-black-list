const TextInput = ({ value, i, type, text, ex, mzj }) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2 w-full"
        htmlFor={i | ("int-" + type + "-" + text)}
      >
        {text}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={i | ("int-" + type + "-" + text)}
        type={type}
        placeholder={ex}
        onChange={(e) => value(e.target.value)}
      />
      <p
        className={
          "text-red-500 text-xs italic " + (mzj?.code == 0 ? "hidden" : "")
        }
      >
        {mzj?.note}
      </p>
    </div>
  );
};

export default TextInput;
