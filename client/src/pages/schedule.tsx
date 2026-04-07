import { useGetSchedule } from '../api/hooks';
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ContentCard from "@/components/ContentCard";
import { Calendar } from "lucide-react";

const DAYS = [
  { key: "senin", label: "Senin" },
  { key: "selasa", label: "Selasa" },
  { key: "rabu", label: "Rabu" },
  { key: "kamis", label: "Kamis" },
  { key: "jumat", label: "Jumat" },
  { key: "sabtu", label: "Sabtu" },
  { key: "minggu", label: "Minggu" },
];

export default function SchedulePage() {
  const today = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]?.key || "senin";
  const [activeDay, setActiveDay] = useState(today);
  const { data, isLoading } = useGetSchedule({ day: activeDay });
  const schedule = (data as any)?.data || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-primary" /> Jadwal Tayang
        </h1>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {DAYS.map(day => (
            <button
              key={day.key}
              onClick={() => setActiveDay(day.key)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeDay === day.key
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : schedule.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>Tidak ada jadwal untuk hari ini</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {schedule.map((item: any) => (
              <ContentCard key={item.id} id={item.id} title={item.title} image={item.image} type={item.type} rating={item.rating} episode={item.episode} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
