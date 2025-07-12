export default function Gallery() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gallery</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className="h-40 bg-gray-300 flex items-center justify-center"
          >
            Image {n}
          </div>
        ))}
      </div>
    </div>
  );
}
