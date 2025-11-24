import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import FotoPizza from "../assets/prueba7.png";
import HomePageNav from "../components/HomePageNav";
import api from "../services/api";

const CreationPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [sizesOptions, setSizesOptions] = useState([]);
  const [doughOptions, setDoughOptions] = useState([]);
  const [sauceOptions, setSauceOptions] = useState([]);
  const [cheeseOptions, setCheeseOptions] = useState([]);
  const [toppingOptions, setToppingOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [size, setSize] = useState("");
  const [crust, setCrust] = useState("");
  const [sauce, setSauce] = useState("");
  const [cheese, setCheese] = useState("");
  const [selectedIngredientIds, setSelectedIngredientIds] = useState([]);

  useEffect(() => {
    api.get("/ingredients")
      .then((res) => {
        const all = res.data;

        setSizesOptions(all.filter(i => i.type === "SIZE"));
        setDoughOptions(all.filter(i => i.type === "PIZZA_BASE"));
        setSauceOptions(all.filter(i => i.type === "SAUCE"));
        setCheeseOptions(all.filter(i => i.type === "CHEESE"));

        setToppingOptions(
          all.filter(
            i => i.type === "VEGETABLE" || (i.type === "MEAT" && !i.name.includes("Carne"))
          )
        );
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const currentPrice = useMemo(() => {
    const sizeObj = sizesOptions.find(i => i.name === size);
    const crustObj = doughOptions.find(i => i.name === crust);
    const sauceObj = sauceOptions.find(i => i.name === sauce);
    const cheeseObj = cheeseOptions.find(i => i.name === cheese);

    const baseCost =
      (sizeObj?.cost || 0) +
      (crustObj?.cost || 0) +
      (sauceObj?.cost || 0) +
      (cheeseObj?.cost || 0);

    const toppingsCost = toppingOptions
      .filter(ing => selectedIngredientIds.includes(ing.id))
      .reduce((s, ing) => s + ing.cost, 0);

    return baseCost + toppingsCost;
  }, [size, crust, sauce, cheese, selectedIngredientIds, sizesOptions, doughOptions, sauceOptions, cheeseOptions, toppingOptions]);

  const handleToppingToggle = (id) => {
    setSelectedIngredientIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAddToCart = async () => {
    if (!user) return navigate("/login");
    if (!size || !crust || !sauce || !cheese)
      return alert("Completa la configuración base");

    const payload = {
      userId: user.id,
      quantity: 1,
      unitPrice: currentPrice,
      creation: {
        name: `Pizza ${size} - ${crust}`,
        productType: "PIZZA",
        userId: user.id,
        size,
        crust,
        sauce,
        cheese,
        ingredientIds: selectedIngredientIds,
      },
    };

    try {
      await api.post("/orders/add-item", payload);
      navigate("/checkout");
    } catch (error) {
      console.error(error);
      alert("Error al guardar pedido");
    }
  };

  const renderOptions = (options) =>
    options.map((opt) => (
      <option key={opt.id} value={opt.name}>
        {opt.name} {opt.cost > 0 ? `(+$${opt.cost})` : ""}
      </option>
    ));

  return (
    <div className="relative min-h-screen text-gray-100 font-sans">
      <HomePageNav />

      {/* Fondo */}
      <div className="fixed inset-0 -z-10">
        <img
          src={FotoPizza}
          className="w-full h-full object-cover blur-sm scale-110 opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl flex flex-col lg:flex-row gap-8">

        {/* IZQUIERDA */}
        <div className="flex-1 w-full">

          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Arma tu <span className="text-orange-500">Pizza</span>
            </h1>
            <p className="text-gray-300 text-lg">Sabor infinito combinando ingredientes.</p>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 animate-fade-in-up">

            {/* Paso 1 */}
            <section className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold mr-3">1</div>
                <h2 className="text-2xl font-bold text-gray-800">Base de la Pizza</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Tamaño */}
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2 uppercase ">Tamaño</label>
                  <select
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-black"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    <option value="">Seleccione...</option>
                    {renderOptions(sizesOptions)}
                  </select>
                </div>

                {/* Masa */}
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2 uppercase">Masa</label>
                  <select
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-black"
                    value={crust}
                    onChange={(e) => setCrust(e.target.value)}
                  >
                    <option value="">Seleccione...</option>
                    {renderOptions(doughOptions)}
                  </select>
                </div>

                {/* Salsa */}
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2 uppercase">Salsa</label>
                  <select
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-black"
                    value={sauce}
                    onChange={(e) => setSauce(e.target.value)}
                  >
                    <option value="">Seleccione...</option>
                    {renderOptions(sauceOptions)}
                  </select>
                </div>

                {/* Queso */}
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2 uppercase">Queso</label>
                  <select
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-black"
                    value={cheese}
                    onChange={(e) => setCheese(e.target.value)}
                  >
                    <option value="">Seleccione...</option>
                    {renderOptions(cheeseOptions)}
                  </select>
                </div>

              </div>
            </section>

            <hr className="border-gray-200 mb-8" />

            {/* Paso 2 */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold mr-3">2</div>
                <h2 className="text-2xl font-bold text-gray-800">Toppings</h2>
              </div>

              {loading ? (
                <p className="text-gray-600">Cargando...</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {toppingOptions.map((ing) => (
                    <label
                      key={ing.id}
                      className={`
                        flex items-center space-x-2 p-3 rounded-xl border cursor-pointer transition-all text-black
                        ${
                          selectedIngredientIds.includes(ing.id)
                            ? "border-orange-500 bg-orange-50 shadow-sm"
                            : "border-gray-200 hover:border-gray-300"
                        }
                      `}
                    >
                      <input
                        type="checkbox"
                        className="accent-orange-500 w-4 h-4"
                        checked={selectedIngredientIds.includes(ing.id)}
                        onChange={() => handleToppingToggle(ing.id)}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {ing.name} {ing.cost > 0 ? `(+$${ing.cost})` : ""}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>

        {/* DERECHA — RESUMEN */}
        <div className="lg:w-1/3 w-full lg:sticky lg:top-24">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border-t-8 border-orange-500">

            <h3 className="text-2xl font-bold text-gray-800 mb-6">Tu Pizza</h3>

            <div className="space-y-4 mb-8 text-gray-600 text-sm">
              <div className="flex justify-between border-b pb-3">
                <span>Tamaño ({size || "-"})</span>
                <span>${sizesOptions.find(i=>i.name===size)?.cost || 0}</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span>Masa ({crust || "-"})</span>
                <span>${doughOptions.find(i=>i.name===crust)?.cost || 0}</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span>Salsa ({sauce || "-"})</span>
                <span>${sauceOptions.find(i=>i.name===sauce)?.cost || 0}</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span>Queso ({cheese || "-"})</span>
                <span>${cheeseOptions.find(i=>i.name===cheese)?.cost || 0}</span>
              </div>

              {selectedIngredientIds.length > 0 && (
                <div className="flex justify-between border-b pb-3 text-orange-600 font-semibold">
                  <span>Extras ({selectedIngredientIds.length})</span>
                  <span>
                    +$
                    {toppingOptions
                      .filter(i => selectedIngredientIds.includes(i.id))
                      .reduce((s, i) => s + i.cost, 0)}
                  </span>
                </div>
              )}
            </div>

            <div className="text-4xl font-bold text-orange-600 mb-6">
              ${currentPrice}
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition"
            >
              Agregar
            </button>

            <Link
              to="/creator"
              className="block text-center mt-6 text-gray-400 hover:text-orange-500 text-sm"
            >
              ← Cancelar y volver
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreationPage;
