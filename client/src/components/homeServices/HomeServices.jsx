import React, { useEffect, useMemo, useState } from "react";
import AppointmentBooking from "../appointments/AppointmentBooking";
import { fetchHomeServiceTests } from "./homeService.api";

const S = {
  page: {
    padding: "110px 28px 48px",
    background: "#f4f8fb",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: "#fff",
    borderRadius: 20,
    padding: 24,
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
  },
  title: {
    margin: 0,
    color: "#0A2540",
    fontSize: "1.8rem",
    fontWeight: 800,
  },
  text: {
    color: "#64748b",
    marginTop: 8,
  },
  error: {
    color: "#e63946",
    fontWeight: 700,
  },
};

function normalizeTest(test, category) {
  return {
    id: String(test.id),
    code: test.code || "",
    name: test.name || "Unnamed Test",
    subtitle: test.subtitle || "",
    price: Number(test.price || 0),
    oldPrice: Number(test.old_price || 0),
    icon: test.icon || "🧪",
    category: category.category_name,
    features: Array.isArray(test.features) ? test.features : [],
    instructions: Array.isArray(test.instructions) ? test.instructions : [],
    isPrescriptionRequired: Boolean(test.is_prescription_required),
    fastingRequired: Boolean(test.fasting_required),
    fastingHours: Number(test.fasting_hours || 0),
  };
}

export default function HomeServices() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadTests = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await fetchHomeServiceTests();

        if (!result.success) {
          throw new Error(result.message || "Unable to load tests");
        }

        if (mounted) {
          setCategories(Array.isArray(result.data) ? result.data : []);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load home service tests"
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadTests();

    return () => {
      mounted = false;
    };
  }, []);

  const allTests = useMemo(() => {
    return categories.flatMap((category) =>
      category.tests.map((test) => normalizeTest(test, category))
    );
  }, [categories]);

  const filteredTests = useMemo(() => {
    const query = search.trim().toLowerCase();

    return allTests.filter((test) => {
      const categoryMatch =
        selectedCategory === "all" || test.category === selectedCategory;

      const searchMatch =
        !query ||
        test.name.toLowerCase().includes(query) ||
        test.subtitle.toLowerCase().includes(query) ||
        test.code.toLowerCase().includes(query) ||
        test.features.some((feature) =>
          String(feature).toLowerCase().includes(query)
        );

      return categoryMatch && searchMatch;
    });
  }, [allTests, selectedCategory, search]);

  if (loading) {
    return (
      <div style={S.page}>
        <div style={S.card}>
          <h1 style={S.title}>Home Service Tests</h1>
          <p style={S.text}>Loading tests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={S.page}>
        <div style={S.card}>
          <h1 style={S.title}>Home Service Tests</h1>
          <p style={S.error}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <AppointmentBooking
      title="Book Home Service Test"
      scans={filteredTests}
      mode="home-service"
      bookingType="home-service"
      bookingEndpoint="/home-service/book"
      categories={categories}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      search={search}
      setSearch={setSearch}
    />
  );
}