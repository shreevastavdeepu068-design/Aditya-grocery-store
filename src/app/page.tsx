export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-4xl space-y-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
          Aditya Store
        </h1>
        <p className="text-xl text-gray-600">Online Delivery</p>

        <div className="space-y-2 rounded-lg bg-green-50 p-6">
          <p className="text-base font-semibold text-gray-800">
            📍 Tajpur Road, Sidhpura, Kasganj
          </p>
          <p className="text-lg font-bold text-green-600">
            📞 +91 9548924542
          </p>
          <p className="text-sm text-gray-600">
            🚚 Delivery available within 15 km radius
          </p>
        </div>

        <p className="text-gray-500">
          Welcome! Your grocery store is under construction.
        </p>
      </div>
    </main>
  );
}
