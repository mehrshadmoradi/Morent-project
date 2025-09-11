"use client";
import { useState } from "react";
import {
  Search,
  MapPin,
  Menu,
  Bell,
  Heart,
  Settings,
  User,
  ChevronDown,
  Car,
  Users,
  Fuel,
  X,
  Circle,
  SlidersHorizontal,
  ArrowUpDown,
} from "lucide-react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { Capacity, CarType, CarDetails } from "../types";

// List of random cities
const cities: string[] = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCapacities, setSelectedCapacities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(100);
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [pickupLocation, setPickupLocation] = useState<string>("New York");
  const [dropoffLocation, setDropoffLocation] = useState<string>("New York");
  const [pickupDate, setPickupDate] = useState<Dayjs | null>(dayjs());
  const [dropoffDate, setDropoffDate] = useState<Dayjs | null>(
    dayjs().add(1, "day")
  );
  const [pickupTime, setPickupTime] = useState<Dayjs | null>(
    dayjs().set("hour", 10).set("minute", 0)
  );
  const [dropoffTime, setDropoffTime] = useState<Dayjs | null>(
    dayjs().set("hour", 10).set("minute", 0)
  );
  const [cars, setCars] = useState<CarDetails[]>([
    {
      name: "Koenigsegg",
      type: "Sport",
      price: 30,
      discountedPrice: 60,
      people: 2,
      fuel: "90L",
      transmission: "Manual",
      isLiked: false,
    },
    {
      name: "Nissan GT - R",
      type: "Sport",
      price: 0.1,
      discountedPrice: 0.2,
      people: 2,
      fuel: "80L",
      transmission: "Manual",
      isLiked: false,
    },
    {
      name: "Rolls-Royce",
      type: "Sport",
      price: 5,
      discountedPrice: 5,
      people: 4,
      fuel: "70L",
      transmission: "Automatic",
      isLiked: false,
    },
    {
      name: "All New Rush",
      type: "SUV",
      price: 70,
      people: 6,
      fuel: "75L",
      transmission: "Manual",
      isLiked: false,
    },
    {
      name: "CR - V",
      type: "SUV",
      price: 80,
      people: 6,
      fuel: "80L",
      transmission: "Automatic",
      isLiked: false,
    },
    {
      name: "All New Terios",
      type: "SUV",
      price: 96,
      people: 8,
      fuel: "90L",
      transmission: "Automatic",
      isLiked: false,
    },
    {
      name: "MG ZX Excludes",
      type: "Hatchback",
      price: 72,
      discountedPrice: 80,
      people: 4,
      fuel: "65L",
      transmission: "Manual",
      isLiked: false,
    },
    {
      name: "New MG ZS",
      type: "SUV",
      price: 70,
      people: 4,
      fuel: "70L",
      transmission: "Automatic",
      isLiked: false,
    },
    {
      name: "MG ZX Excite",
      type: "Hatchback",
      price: 76,
      discountedPrice: 80,
      people: 4,
      fuel: "68L",
      transmission: "Automatic",
      isLiked: false,
    },
  ]);

  // Data with explicit types
  const carTypes: CarType[] = [
    { name: "Sport", count: 10 },
    { name: "SUV", count: 12 },
    { name: "MPV", count: 16 },
    { name: "Sedan", count: 20 },
    { name: "Coupe", count: 14 },
    { name: "Hatchback", count: 14 },
  ];

  const capacities: Capacity[] = [
    { name: "2 Person", count: 10 },
    { name: "4 Person", count: 14 },
    { name: "6 Person", count: 12 },
    { name: "8 or More", count: 16 },
  ];

  // Handler functions with typed parameters
  const toggleType = (type: string): void => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const toggleCapacity = (capacity: string): void => {
    if (selectedCapacities.includes(capacity)) {
      setSelectedCapacities(selectedCapacities.filter((c) => c !== capacity));
    } else {
      setSelectedCapacities([...selectedCapacities, capacity]);
    }
  };

  const handlePriceRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPriceRange(Number(e.target.value));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const handleLocationChange = (
    e: SelectChangeEvent<string>,
    isPickup: boolean
  ): void => {
    if (isPickup) {
      setPickupLocation(e.target.value);
    } else {
      setDropoffLocation(e.target.value);
    }
  };

  const handleDateChange = (
    newValue: Dayjs | null,
    isPickup: boolean
  ): void => {
    if (isPickup) {
      setPickupDate(newValue);
    } else {
      setDropoffDate(newValue);
    }
  };

  const handleTimeChange = (
    newValue: Dayjs | null,
    isPickup: boolean
  ): void => {
    if (isPickup) {
      setPickupTime(newValue);
    } else {
      setDropoffTime(newValue);
    }
  };

  const resetFilters = (): void => {
    setSelectedTypes([]);
    setSelectedCapacities([]);
    setPriceRange(100);
  };

  const toggleLike = (index: number): void => {
    const updatedCars = [...cars];
    updatedCars[index].isLiked = !updatedCars[index].isLiked;
    setCars(updatedCars);
  };

  // Filter function with proper typing
  const filteredCars: CarDetails[] = cars.filter((car: CarDetails) => {
    // Filter by search query
    if (
      searchQuery &&
      !car.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by selected types
    if (selectedTypes.length > 0 && !selectedTypes.includes(car.type)) {
      return false;
    }

    // Filter by selected capacities
    if (selectedCapacities.length > 0) {
      const capacityMatch = selectedCapacities.some((capacity: string) => {
        if (capacity === "2 Person") return car.people === 2;
        if (capacity === "4 Person") return car.people === 4;
        if (capacity === "6 Person") return car.people === 6;
        if (capacity === "8 or More") return car.people >= 8;
        return false;
      });

      if (!capacityMatch) return false;
    }

    // Filter by price range
    if (car.price > priceRange) {
      return false;
    }

    return true;
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
          <div className="hidden md:flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">MORENT</h1>
          </div>

          <div className="hidden md:flex relative w-1/3">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for a car"
              className="pl-10 pr-4 py-2 w-full rounded-4xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <SlidersHorizontal className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="hidden md:block p-2 rounded-full hover:bg-gray-100"
              aria-label="Favorites"
            >
              <Heart className="h-6 w-6 text-gray-600" />
            </button>
            <button
              className="hidden md:block p-2 rounded-full hover:bg-gray-100"
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6 text-gray-600" />
            </button>
            <button
              className="hidden md:block p-2 rounded-full hover:bg-gray-100"
              aria-label="Settings"
            >
              <Settings className="h-6 w-6 text-gray-600" />
            </button>
            <button
              className="hidden md:flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
              aria-label="User profile"
            >
              <div className="bg-gray-200 rounded-full p-1">
                <User className="h-8 w-8 text-gray-600" />
              </div>
              <span className="text-sm font-medium">John Doe</span>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          <div className="md:hidden flex w-full justify-between">
            <button aria-label="Menu" onClick={() => setIsMenuOpen(true)}>
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <div className="bg-gray-200 rounded-full p-1">
              <User className="h-8 w-8 text-gray-600" />
            </div>
          </div>
        </header>

        <div>
          {/* Mobile Search */}
          <div className="md:hidden mb-6 flex flex-col bg-white py-4 px-6">
            <div className="flex items-center mb-3">
              <h1 className="text-2xl font-bold text-blue-600">MORENT</h1>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search something here"
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
            <div className="absolute left-0 top-0 h-full w-3/4 bg-white shadow-lg p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold">Menu</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Profile Section in Mobile Menu */}
              <div className="flex items-center space-x-3 p-4 mb-6 bg-gray-100 rounded-lg">
                <div className="bg-blue-100 rounded-full p-2">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Mehrshad</p>
                  <p className="text-sm text-gray-500">mehrshad@example.com</p>
                </div>
              </div>

              <div className="space-y-6">
                <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 w-full">
                  <Heart className="h-6 w-6 text-gray-600" />
                  <span>Favorites</span>
                </button>
                <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 w-full">
                  <Bell className="h-6 w-6 text-gray-600" />
                  <span>Notifications</span>
                </button>
                <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 w-full">
                  <Settings className="h-6 w-6 text-gray-600" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="m-2 md:m-0">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <aside className="lg:w-1/4 bg-white shadow-sm p-6 h-fit left-0">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  className="text-blue-600 text-sm font-medium"
                  onClick={resetFilters}
                >
                  Reset
                </button>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">TYPE</h3>
                  <button
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className="lg:hidden"
                    aria-label={
                      isFiltersOpen ? "Collapse filters" : "Expand filters"
                    }
                  >
                    <ChevronDown
                      className={`h-5 w-5 transform ${
                        isFiltersOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
                <div
                  className={`${
                    isFiltersOpen ? "block" : "hidden"
                  } lg:block space-y-3`}
                >
                  {carTypes.map((type: CarType) => (
                    <div
                      key={type.name}
                      className="flex items-center justify-between"
                    >
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                          checked={selectedTypes.includes(type.name)}
                          onChange={() => toggleType(type.name)}
                        />
                        <span className="ml-2 text-gray-700">{type.name}</span>
                      </label>
                      <span className="text-gray-400 text-sm">
                        ({type.count})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capacity Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">CAPACITY</h3>
                  <button
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className="lg:hidden"
                    aria-label={
                      isFiltersOpen ? "Collapse filters" : "Expand filters"
                    }
                  >
                    <ChevronDown
                      className={`h-5 w-5 transform ${
                        isFiltersOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
                <div
                  className={`${
                    isFiltersOpen ? "block" : "hidden"
                  } lg:block space-y-3`}
                >
                  {capacities.map((capacity: Capacity) => (
                    <div
                      key={capacity.name}
                      className="flex items-center justify-between"
                    >
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                          checked={selectedCapacities.includes(capacity.name)}
                          onChange={() => toggleCapacity(capacity.name)}
                        />
                        <span className="ml-2 text-gray-700">
                          {capacity.name}
                        </span>
                      </label>
                      <span className="text-gray-400 text-sm">
                        ({capacity.count})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">PRICE</h3>
                </div>
                <div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-gray-700">
                      Max. ${priceRange.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange}
                    onChange={handlePriceRangeChange}
                    className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-gray-400 text-sm mt-1">
                    <span>$0</span>
                    <span>$100</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="md:w-3/4">
              {/* Pick-up & Drop-off */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] mt-7 items-center gap-4 relative">
                {/* Pick-Up Section */}
                <div className="bg-white rounded-lg shadow-sm p-3">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                    Pick - Up
                  </h3>
                  <div className="flex flex-wrap">
                    {/* Location */}
                    <div className="flex-1 min-w-[180px] px-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Locations
                      </label>
                      <Select
                        value={pickupLocation}
                        onChange={(e: SelectChangeEvent<string>) =>
                          handleLocationChange(e, true)
                        }
                        className="w-full"
                        size="small"
                        IconComponent={ChevronDown}
                        displayEmpty
                        renderValue={(value) =>
                          value || (
                            <span className="text-gray-400">
                              Select location
                            </span>
                          )
                        }
                      >
                        {cities.map((city: string) => (
                          <MenuItem key={city} value={city}>
                            {city}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>

                    {/* Date */}
                    <div className="flex-1 min-w-[180px] border-l-2 border-gray-200 px-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <DatePicker
                        value={pickupDate}
                        onChange={(newValue: Dayjs | null) =>
                          handleDateChange(newValue, true)
                        }
                        slotProps={{
                          textField: {
                            size: "small",
                            placeholder: "Select date",
                            sx: { width: "100%" },
                          },
                        }}
                      />
                    </div>

                    {/* Time */}
                    <div className="flex-1 min-w-[180px] border-l-2 border-gray-200 px-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time
                      </label>
                      <TimePicker
                        value={pickupTime}
                        onChange={(newValue: Dayjs | null) =>
                          handleTimeChange(newValue, true)
                        }
                        slotProps={{
                          textField: {
                            size: "small",
                            placeholder: "Select time",
                            sx: { width: "100%" },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Switch Button */}
                <div className="flex justify-center items-center -m-6 self-center relative z-10">
                  <div className="bg-blue-600 rounded-md p-2 md:p-3 shadow-md flex items-center justify-center">
                    <ArrowUpDown className="h-5 w-5 text-white" />
                  </div>
                </div>

                {/* Drop-Off Section */}
                <div className="bg-white rounded-lg shadow-sm p-3">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                    Drop - Off
                  </h3>
                  <div className="flex flex-wrap">
                    {/* Location */}
                    <div className="flex-1 min-w-[180px] px-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Locations
                      </label>
                      <Select
                        value={pickupLocation}
                        onChange={(e: SelectChangeEvent<string>) =>
                          handleLocationChange(e, true)
                        }
                        className="w-full"
                        size="small"
                        IconComponent={ChevronDown}
                        displayEmpty
                        renderValue={(value) =>
                          value || (
                            <span className="text-gray-400">
                              Select location
                            </span>
                          )
                        }
                      >
                        {cities.map((city: string) => (
                          <MenuItem key={city} value={city}>
                            {city}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>

                    {/* Date */}
                    <div className="flex-1 min-w-[180px] border-l-2 border-gray-200 px-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <DatePicker
                        value={pickupDate}
                        onChange={(newValue: Dayjs | null) =>
                          handleDateChange(newValue, true)
                        }
                        slotProps={{
                          textField: {
                            size: "small",
                            placeholder: "Select date",
                            sx: { width: "100%" },
                          },
                        }}
                      />
                    </div>

                    {/* Time */}
                    <div className="flex-1 min-w-[180px] border-l-2 border-gray-200 px-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time
                      </label>
                      <TimePicker
                        value={pickupTime}
                        onChange={(newValue: Dayjs | null) =>
                          handleTimeChange(newValue, true)
                        }
                        slotProps={{
                          textField: {
                            size: "small",
                            placeholder: "Select time",
                            sx: { width: "100%" },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Cars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-7">
                {filteredCars.map((car: CarDetails, index: number) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{car.name}</h3>
                          <p className="text-gray-500 text-sm">{car.type}</p>
                        </div>
                        <button
                          aria-label={`${
                            car.isLiked ? "Remove from" : "Add to"
                          } favorites`}
                          onClick={() => toggleLike(index)}
                        >
                          <Heart
                            className={`h-5 w-5 ${
                              car.isLiked
                                ? "fill-red-500 text-red-500"
                                : "text-gray-400"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex flex-row md:flex-col mb-4">
                        <div className="h-32 bg-gray-100 rounded-lg flex-1 flex items-center justify-center mr-4 md:mr-0 md:mb-4">
                          <Car className="h-16 w-16 text-gray-400" />
                        </div>
                        <div className="flex flex-col justify-center md:flex-row md:justify-between md:w-full">
                          <div className="flex flex-col space-y-2 md:hidden">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-600">
                                {car.people} People
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Fuel className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-600">
                                {car.fuel}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Circle className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-600">
                                {car.transmission}
                              </span>
                            </div>
                          </div>

                          <div className="hidden md:flex justify-between space-x-2 w-full">
                            <div className="flex space-x-4">
                              <div className="flex items-center">
                                <Fuel className="h-4 w-4 text-gray-400 mr-1" />
                                <span className="text-sm text-gray-600">
                                  {car.fuel}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Circle className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-600">
                                {car.transmission}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-600">
                                {car.people} People
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex ">
                            <span className="text-lg font-semibold">
                              ${car.price.toFixed(2)}/
                            </span>

                            <span className="text-gray-500 font-semibold text-lg block">
                              day
                            </span>
                          </div>
                          {car.discountedPrice && (
                            <span className="text-gray-400 line-through ml-2">
                              ${car.discountedPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                          Rent Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Show More Button */}
              <div className="relative mt-8 text-center">
                <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition">
                  Show more car
                </button>
                <p className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500">
                  120 Car
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </LocalizationProvider>
  );
}
