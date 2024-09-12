import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { UserIcon, SearchIcon, MenuIcon } from "lucide-react";
import httpClient from "../httpClient";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false); // Add a loading state

  const dates = generatePastWeekDates();
  const saveEntry = async () => {
    console.log(content);
    const response = await httpClient.post("//localhost:5000/save_entry", {
      date: selectedDate,
      content,
    });
    console.log(response.data);
  };

  const getEntry = async () => {
    try {
      setLoading(true); // Set loading state to true before fetching
      const response = await httpClient.post("//localhost:5000/get_entry", {
        date: selectedDate,
      });
      console.log(response.data);
      setContent(response.data.content || ""); // Set the content if data is available
      setLoading(false); // Turn off loading
    } catch (error) {
      console.error("Error fetching entry:", error);
      setContent(""); // If there's an error, set content to an empty string
      setLoading(false);
    }
  };
  // Fetch the entry whenever the selected date changes
  useEffect(() => {
    getEntry();
  }, [selectedDate]);

  const logoutUser = async () => {
    const response = await httpClient.post("//localhost:5000/logout");
    console.log(response);
  };

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
              <Link to="/">
                <Button variant="secondary" onClick={logoutUser}>
                  <UserIcon className="mr-2 h-4 w-4" /> Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow flex overflow-hidden">
        {/* Left Pane */}
        <div className="w-64 bg-muted p-4 overflow-y-auto hidden md:block">
          <div className="flex justify-center">
            <Button onClick={saveEntry}>Save</Button>
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
          {loading ? (
            <div className="flex items-center space-x-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ) : (
            <Textarea
              className="w-full h-full resize-none"
              value={content} // Set the value of the textarea to the fetched content
              placeholder={`Start typing your entry for ${new Date(
                selectedDate
              ).toLocaleDateString()}`}
              onChange={(e) => setContent(e.target.value)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DiaryPage;
