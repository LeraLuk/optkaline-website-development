import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Filters {
  brands: string[];
  genders: string[];
  seasons: string[];
  types: string[];
  priceRange: { min: number; max: number };
}

interface ProductFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onReset: () => void;
  initialFilters?: Filters;
}

const ProductFilters = ({
  filters,
  onChange,
  onReset,
  initialFilters,
}: ProductFiltersProps) => {
  const brands = ["Mustang", "Osse", "Hawk", "Diverso"];
  const genders = ["мужские", "женские", "детские", "унисекс"];
  const seasons = ["весна-лето", "осень-зима", "всесезонные"];
  const types = ["солнцезащитные", "медицинская оптика"];

  const handleArrayFilter = (
    category: keyof Filters,
    value: string,
    checked: boolean,
  ) => {
    const currentArray = filters[category] as string[];
    const newArray = checked
      ? [...currentArray, value]
      : currentArray.filter((item) => item !== value);

    onChange({ ...filters, [category]: newArray });
  };

  const handlePriceChange = (field: "min" | "max", value: string) => {
    const numValue = parseInt(value) || 0;
    onChange({
      ...filters,
      priceRange: { ...filters.priceRange, [field]: numValue },
    });
  };

  const handleReset = () => {
    if (initialFilters) {
      onChange(initialFilters);
    } else {
      onReset();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Фильтры
          <Button variant="outline" size="sm" onClick={handleReset}>
            Сбросить
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Цена */}
        <div>
          <Label className="text-sm font-semibold">Цена (₽)</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Input
              type="number"
              placeholder="От"
              value={filters.priceRange.min || ""}
              onChange={(e) => handlePriceChange("min", e.target.value)}
            />
            <Input
              type="number"
              placeholder="До"
              value={filters.priceRange.max || ""}
              onChange={(e) => handlePriceChange("max", e.target.value)}
            />
          </div>
        </div>

        {/* Бренды */}
        <div>
          <Label className="text-sm font-semibold">Бренд</Label>
          <div className="space-y-2 mt-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={(checked) =>
                    handleArrayFilter("brands", brand, checked as boolean)
                  }
                />
                <Label htmlFor={brand} className="text-sm">
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Гендер */}
        <div>
          <Label className="text-sm font-semibold">Гендер</Label>
          <div className="space-y-2 mt-2">
            {genders.map((gender) => (
              <div key={gender} className="flex items-center space-x-2">
                <Checkbox
                  id={gender}
                  checked={filters.genders.includes(gender)}
                  onCheckedChange={(checked) =>
                    handleArrayFilter("genders", gender, checked as boolean)
                  }
                />
                <Label htmlFor={gender} className="text-sm capitalize">
                  {gender}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Сезон */}
        <div>
          <Label className="text-sm font-semibold">Сезон</Label>
          <div className="space-y-2 mt-2">
            {seasons.map((season) => (
              <div key={season} className="flex items-center space-x-2">
                <Checkbox
                  id={season}
                  checked={filters.seasons.includes(season)}
                  onCheckedChange={(checked) =>
                    handleArrayFilter("seasons", season, checked as boolean)
                  }
                />
                <Label htmlFor={season} className="text-sm">
                  {season}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Тип */}
        <div>
          <Label className="text-sm font-semibold">Тип</Label>
          <div className="space-y-2 mt-2">
            {types.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={filters.types.includes(type)}
                  onCheckedChange={(checked) =>
                    handleArrayFilter("types", type, checked as boolean)
                  }
                />
                <Label htmlFor={type} className="text-sm">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFilters;
