export default function CustomerLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="p-6 bg-white rounded shadow-md space-y-4">
        <h1 className="text-xl font-bold">Customer Login</h1>
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="Email"
        />
        <input
          className="border p-2 w-full"
          type="password"
          placeholder="Password"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}
