"use client";

type Props = {
  active: string;
  setActive: (value: string) => void;
};

const categories = [
  { id: "all", label: "All" },
  { id: "crypto", label: "Crypto" },
  { id: "farcaster", label: "Farcaster" },
  { id: "governance", label: "Governance" },
];

export default function CategoryTabs({ active, setActive }: Props) {
  return (
    <div className="flex justify-center gap-3 mb-10 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setActive(cat.id)}
          className={`px-4 py-2 rounded-full transition-all duration-200 ${
            active === cat.id
              ? "bg-black text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
