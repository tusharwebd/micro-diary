import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { UserIcon, SearchIcon, MenuIcon } from "lucide-react";

// Function to generate a list of dates for the past 7 days
const generatePastWeekDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split("T")[0]); // Format as YYYY-MM-DD
  }
  return dates;
};

function DiaryPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(generatePastWeekDates()[0]); // Default to today
  const dates = generatePastWeekDates();

  return (
    <div className="flex flex-col w-screen h-screen">
      {/* Navigation Bar */}
      <nav className="bg-primary text-primary-foreground p-4 w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <h1 className="text-xl font-bold">My App</h1>
          </div>
          <div
            className={`flex-grow md:flex md:items-center md:w-auto ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <div className="md:flex-grow"></div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 w-full md:w-auto"
                />
              </div>
              <Button variant="secondary">
                <UserIcon className="mr-2 h-4 w-4" /> Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow flex overflow-hidden">
        {/* Left Pane */}
        <div className="w-64 bg-muted p-4 overflow-y-auto hidden md:block">
          <div className="flex justify-center">
            <Button>Save</Button>
          </div>
          <br />
          <Separator />
          <h2 className="text-lg font-semibold mb-4">Diary Entries</h2>

          {/* Dynamic list of dates */}
          {dates.map((date, index) => (
            <div key={date}>
              <Button
                variant={selectedDate === date ? "primary" : "ghost"}
                className="w-full text-left"
                onClick={() => setSelectedDate(date)}
              >
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </Button>
              {index < dates.length - 1 && <Separator />}{" "}
              {/* Add a separator between the dates */}
            </div>
          ))}
        </div>

        {/* Textarea */}
        <div className="flex-grow p-4 overflow-y-auto">
          <Textarea
            className="w-full h-full resize-none"
            placeholder={`Start typing your entry for ${new Date(
              selectedDate
            ).toLocaleDateString()}`}
          />
        </div>
      </div>
    </div>
  );
}

export default DiaryPage;
