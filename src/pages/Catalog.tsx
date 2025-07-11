import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import { products } from "@/data/products";

interface Filters {
  brands: string[];
  genders: string[];
  seasons: string[];
  types: string[];
  priceRange: { min: number; max: number };
  sortBy: string;
}

const Catalog = () => {
  const [searchParams] = useSearchParams();
  const { brand: urlBrand, type: urlType } = useParams();

  const [filters, setFilters] = useState<Filters>({
    brands: [],
    genders: [],
    seasons: [],
    types: [],
    priceRange: { min: 0, max: 0 },
    sortBy: "",
  });

  // Установка фильтров из URL при загрузке
  useEffect(() => {
    const brandParam = urlBrand || searchParams.get("brand");
    const typeParam = urlType || searchParams.get("type");

    if (brandParam || typeParam) {
      setFilters((prev) => ({
        ...prev,
        brands: brandParam ? [brandParam] : prev.brands,
        types: typeParam ? [typeParam] : prev.types,
      }));
    }
  }, [searchParams, urlBrand, urlType]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      // Бренд
      if (
        filters.brands.length > 0 &&
        !filters.brands.includes(product.brand)
      ) {
        return false;
      }

      // Гендер
      if (
        filters.genders.length > 0 &&
        !filters.genders.includes(product.gender)
      ) {
        return false;
      }

      // Сезон
      if (
        filters.seasons.length > 0 &&
        !filters.seasons.includes(product.season)
      ) {
        return false;
      }

      // Тип
      if (filters.types.length > 0 && !filters.types.includes(product.type)) {
        return false;
      }

      // Цена
      if (
        filters.priceRange.min > 0 &&
        product.price < filters.priceRange.min
      ) {
        return false;
      }

      if (
        filters.priceRange.max > 0 &&
        product.price > filters.priceRange.max
      ) {
        return false;
      }

      return true;
    });

    // Применяем сортировку
    if (filters.sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      brands: [],
      genders: [],
      seasons: [],
      types: [],
      priceRange: { min: 0, max: 0 },
      sortBy: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Каталог товаров</h1>
          <p className="text-gray-600">
            Найдено товаров: {filteredProducts.length}
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Фильтры */}
          <div className="lg:col-span-1">
            <ProductFilters
              filters={filters}
              onChange={setFilters}
              onReset={resetFilters}
            />
          </div>

          {/* Товары */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  Товары не найдены. Попробуйте изменить фильтры.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
