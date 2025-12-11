"use client"

type Occasion = "commute" | "date" | "gym" | "street"

type Props = {
  value: Occasion
  onChange: (o: Occasion) => void
}

const Chip = ({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-8 py-6 border-1 rounded-none text-base tracking-[0.25em] transition-all duration-500 font-light ${
      active 
        ? "bg-black text-white border-black shadow-xl scale-[1.02]" 
        : "bg-white border-black/5 hover:border-black/20 hover:shadow-xl hover:scale-[1.01]"
    }`}
  >
    {label}
  </button>
)

export default function OccasionChips({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Chip active={value === "commute"} label="通勤" onClick={() => onChange("commute")} />
      <Chip active={value === "date"} label="约会" onClick={() => onChange("date")} />
      <Chip active={value === "gym"} label="运动" onClick={() => onChange("gym")} />
      <Chip active={value === "street"} label="街头" onClick={() => onChange("street")} />
    </div>
  )
}