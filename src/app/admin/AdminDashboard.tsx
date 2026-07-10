"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import {
  BadgeCheck,
  Boxes,
  ImagePlus,
  KeyRound,
  Layers3,
  Loader2,
  MapPin,
  PackagePlus,
  Save,
  Settings,
  Trash2,
  Upload,
} from "lucide-react";
import { getCategoryHotspots } from "@/data/productHotspots";
import type { AdminContent, ProductCategory, ProductHotspot, ProductRecord, SiteSettings } from "@/types/content";

type AdminTab = "products" | "categories" | "contact" | "branding" | "password";

const emptySettings: SiteSettings = {
  siteName: "",
  logoUrl: "/logo.png",
  faviconUrl: "/logo.png",
  contact: {
    phone: "",
    whatsapp: "",
    email: "",
    addressLines: [],
    mapEmbedUrl: "",
    plantLabel: "",
  },
};

function splitLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function asNumber(value: string) {
  return Number.isFinite(Number(value)) ? Number(value) : 0;
}

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function createProductHotspot(index: number): ProductHotspot {
  return {
    top: "50%",
    left: "50%",
    code: `FEATURE-${String(index + 1).padStart(2, "0")}`,
    title: "New Feature",
    desc: "Describe this product highlight.",
    active: true,
  };
}

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<AdminContent | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>("products");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedCategorySlug, setSelectedCategorySlug] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [status, setStatus] = useState("请输入后台密码载入数据。");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentAdminPassword, setCurrentAdminPassword] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [confirmAdminPassword, setConfirmAdminPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  const products = content?.products || [];
  const categories = content?.categories || [];
  const siteSettings = content?.siteSettings || emptySettings;

  const selectedProduct = products.find((product) => product.id === selectedProductId) || products[0];
  const selectedCategory =
    categories.find((category) => category.slug === selectedCategorySlug) || categories[0];

  const filteredProducts = useMemo(() => {
    const keyword = productSearch.trim().toLowerCase();
    if (!keyword) return products;
    return products.filter((product) =>
      [product.name, product.sku, product.id, product.category].some((value) =>
        String(value || "").toLowerCase().includes(keyword)
      )
    );
  }, [productSearch, products]);

  useEffect(() => {
    const savedPassword = window.localStorage.getItem("huwaibeibao-admin-password") || "";
    if (savedPassword) {
      setPassword(savedPassword);
      void loadContent(savedPassword);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selectedProductId && products[0]) setSelectedProductId(products[0].id);
  }, [products, selectedProductId]);

  useEffect(() => {
    if (!selectedCategorySlug && categories[0]) setSelectedCategorySlug(categories[0].slug);
  }, [categories, selectedCategorySlug]);

  async function loadContent(token = password) {
    setLoading(true);
    setStatus("正在载入后台数据...");
    try {
      const response = await fetch("/api/admin/content", {
        headers: { "x-admin-password": token },
        cache: "no-store",
      });
      if (!response.ok) throw new Error(response.status === 401 ? "后台密码不正确。" : "数据载入失败。");
      const data = (await response.json()) as AdminContent;
      setContent(data);
      setSelectedProductId(data.products[0]?.id || "");
      setSelectedCategorySlug(data.categories[0]?.slug || "");
      window.localStorage.setItem("huwaibeibao-admin-password", token);
      setStatus("后台数据已载入。");
    } catch (error) {
      setContent(null);
      setStatus(error instanceof Error ? error.message : "数据载入失败。");
    } finally {
      setLoading(false);
    }
  }

  async function saveContent() {
    if (!content) return;
    setSaving(true);
    setStatus("正在保存...");
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify(content),
      });
      if (!response.ok) throw new Error(response.status === 401 ? "后台密码不正确。" : "保存失败。");
      const data = (await response.json()) as AdminContent;
      setContent(data);
      setStatus("已保存。前台页面刷新后会读取最新配置。");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "保存失败。");
    } finally {
      setSaving(false);
    }
  }

  async function uploadImage(file: File | undefined, target: string) {
    if (!file) return "";
    const formData = new FormData();
    formData.set("file", file);
    formData.set("target", target);
    setStatus("正在上传图片...");
    const response = await fetch("/api/admin/upload", {
      method: "POST",
      headers: { "x-admin-password": password },
      body: formData,
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || "图片上传失败。");
    }
    const data = (await response.json()) as { url: string };
    setStatus("图片上传完成，请记得保存。");
    return data.url;
  }

  function updateProduct(id: string, patch: Partial<ProductRecord>) {
    setContent((current) => {
      if (!current) return current;
      return {
        ...current,
        products: current.products.map((product) =>
          product.id === id ? { ...product, ...patch } : product
        ),
      };
    });
  }

  function updateProductHotspots(
    id: string,
    updater: (hotspots: ProductHotspot[], product: ProductRecord) => ProductHotspot[]
  ) {
    setContent((current) => {
      if (!current) return current;

      return {
        ...current,
        products: current.products.map((product) =>
          product.id === id
            ? { ...product, hotspots: updater(product.hotspots || [], product) }
            : product
        ),
      };
    });
  }

  function addProductHotspot(id: string) {
    updateProductHotspots(id, (hotspots) => [...hotspots, createProductHotspot(hotspots.length)]);
  }

  function applyCategoryHotspots(id: string) {
    updateProductHotspots(id, (_hotspots, product) =>
      getCategoryHotspots(product.category).map((hotspot) => ({ ...hotspot, active: true }))
    );
  }

  function updateProductHotspot(id: string, index: number, patch: Partial<ProductHotspot>) {
    updateProductHotspots(id, (hotspots) =>
      hotspots.map((hotspot, currentIndex) =>
        currentIndex === index ? { ...hotspot, ...patch } : hotspot
      )
    );
  }

  function deleteProductHotspot(id: string, index: number) {
    updateProductHotspots(id, (hotspots) => hotspots.filter((_, currentIndex) => currentIndex !== index));
  }

  function addProduct() {
    const baseCategory = categories[0]?.slug || "custom_category";
    const id = `prod_${Date.now()}`;
    const product: ProductRecord = {
      id,
      name: "New Product",
      sku: "",
      category: baseCategory,
      capacity: 0,
      material: "",
      moq: 500,
      image: "/logo.png",
      galleryImages: ["/logo.png"],
      description: "",
      hotspots: [],
      leadTime: 30,
      isNew: true,
      isBest: false,
    };
    setContent((current) => (current ? { ...current, products: [product, ...current.products] } : current));
    setSelectedProductId(id);
    setActiveTab("products");
  }

  function deleteProduct(id: string) {
    if (!window.confirm("确定删除这个产品吗？")) return;
    setContent((current) => {
      if (!current) return current;
      const productsLeft = current.products.filter((product) => product.id !== id);
      setSelectedProductId(productsLeft[0]?.id || "");
      return { ...current, products: productsLeft };
    });
  }

  function updateCategory(slug: string, patch: Partial<ProductCategory>) {
    setContent((current) => {
      if (!current) return current;
      return {
        ...current,
        categories: current.categories.map((category) =>
          category.slug === slug ? { ...category, ...patch } : category
        ),
      };
    });
  }

  function addCategory() {
    const slug = `category_${Date.now()}`;
    const category: ProductCategory = {
      slug,
      name: "New Category",
      image: "/logo.png",
      description: "",
      visible: true,
      sortOrder: categories.length * 10 + 10,
    };
    setContent((current) =>
      current ? { ...current, categories: [...current.categories, category] } : current
    );
    setSelectedCategorySlug(slug);
    setActiveTab("categories");
  }

  function deleteCategory(slug: string) {
    const used = products.some((product) => product.category === slug);
    const message = used
      ? "这个分类下还有产品。删除后这些产品会保留原分类值，但筛选里不再显示该分类。确定删除吗？"
      : "确定删除这个分类吗？";
    if (!window.confirm(message)) return;
    setContent((current) => {
      if (!current) return current;
      const categoriesLeft = current.categories.filter((category) => category.slug !== slug);
      setSelectedCategorySlug(categoriesLeft[0]?.slug || "");
      return { ...current, categories: categoriesLeft };
    });
  }

  function updateSettings(patch: Partial<SiteSettings>) {
    setContent((current) =>
      current ? { ...current, siteSettings: { ...current.siteSettings, ...patch } } : current
    );
  }

  function updateContact(patch: Partial<SiteSettings["contact"]>) {
    setContent((current) =>
      current
        ? {
            ...current,
            siteSettings: {
              ...current.siteSettings,
              contact: { ...current.siteSettings.contact, ...patch },
            },
          }
        : current
    );
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await loadContent(password);
  }

  async function handlePasswordChange(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!currentAdminPassword) {
      setStatus("请输入当前后台密码。");
      return;
    }
    if (newAdminPassword.length < 8) {
      setStatus("新密码至少需要 8 个字符。");
      return;
    }
    if (newAdminPassword !== confirmAdminPassword) {
      setStatus("两次输入的新密码不一致。");
      return;
    }

    setChangingPassword(true);
    setStatus("正在修改管理员密码...");
    try {
      const response = await fetch("/api/admin/password", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "x-admin-password": currentAdminPassword,
        },
        body: JSON.stringify({
          currentPassword: currentAdminPassword,
          newPassword: newAdminPassword,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { message?: string };
      if (!response.ok) throw new Error(data.message || "密码修改失败。");

      setPassword(newAdminPassword);
      window.localStorage.setItem("huwaibeibao-admin-password", newAdminPassword);
      setCurrentAdminPassword("");
      setNewAdminPassword("");
      setConfirmAdminPassword("");
      setStatus(data.message || "管理员密码已更新。");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "密码修改失败。");
    } finally {
      setChangingPassword(false);
    }
  }

  const tabs = [
    { id: "products" as const, label: "产品管理", icon: Boxes },
    { id: "categories" as const, label: "分类管理", icon: Layers3 },
    { id: "contact" as const, label: "联系方式", icon: MapPin },
    { id: "branding" as const, label: "Logo 设置", icon: Settings },
    { id: "password" as const, label: "密码设置", icon: KeyRound },
  ];

  if (!content) {
    return (
      <div className="min-h-[calc(100vh-5rem)] bg-surface-container-low px-6 py-16">
        <form
          onSubmit={handleLogin}
          className="mx-auto max-w-md border border-outline-variant bg-white p-8 shadow-sm"
        >
          <div className="mb-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-high-vis-orange">
              Huwaibeibao Admin
            </p>
            <h1 className="mt-2 text-2xl font-bold text-primary">后台管理</h1>
            <p className="mt-2 text-sm text-secondary">
              输入后台密码后即可管理产品、分类、联系方式和网站品牌信息。
            </p>
          </div>
          <label className="block text-xs font-bold uppercase tracking-wider text-secondary">后台密码</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full border border-outline-variant px-4 py-3 outline-none focus:border-high-vis-orange"
            placeholder="默认：huwaibeibao-admin"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-5 flex w-full items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-high-vis-orange disabled:opacity-60"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <BadgeCheck size={16} />}
            进入后台
          </button>
          <p className="mt-4 text-xs text-secondary">{status}</p>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-surface-container-low">
      <div className="border-b border-outline-variant bg-white px-6 py-5 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-high-vis-orange">
              Huwaibeibao Admin
            </p>
            <h1 className="text-2xl font-bold text-primary">网站后台管理</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-secondary">{status}</span>
            <button
              type="button"
              onClick={saveContent}
              disabled={saving}
              className="flex items-center gap-2 bg-high-vis-orange px-5 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-primary disabled:opacity-60"
            >
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              保存全部
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr]">
        <aside className="border-b border-outline-variant bg-white p-4 md:min-h-[calc(100vh-10rem)] md:border-b-0 md:border-r">
          <nav className="grid grid-cols-2 gap-2 md:grid-cols-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 border px-4 py-3 text-left text-sm font-bold transition-colors ${
                    activeTab === tab.id
                      ? "border-high-vis-orange bg-surface-container-low text-primary"
                      : "border-transparent text-secondary hover:border-outline-variant hover:text-primary"
                  }`}
                >
                  <Icon size={17} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
          <div className="mt-6 border-t border-outline-variant pt-5 text-xs leading-relaxed text-secondary">
            <p>产品：{products.length}</p>
            <p>分类：{categories.length}</p>
            <p className="mt-3">首次密码可使用 ADMIN_PASSWORD；后台修改后请使用新密码。</p>
          </div>
        </aside>

        <main className="p-4 md:p-8">
          {activeTab === "products" && selectedProduct && (
            <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
              <div className="border border-outline-variant bg-white p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-primary">产品列表</h2>
                  <button
                    type="button"
                    onClick={addProduct}
                    className="flex items-center gap-1 bg-primary px-3 py-2 text-[11px] font-bold uppercase text-white"
                  >
                    <PackagePlus size={14} />
                    添加
                  </button>
                </div>
                <input
                  value={productSearch}
                  onChange={(event) => setProductSearch(event.target.value)}
                  className="mb-3 w-full border border-outline-variant px-3 py-2 text-sm outline-none focus:border-high-vis-orange"
                  placeholder="搜索产品名 / SKU / ID"
                />
                <div className="max-h-[620px] space-y-2 overflow-y-auto pr-1">
                  {filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => setSelectedProductId(product.id)}
                      className={`w-full border p-3 text-left transition-colors ${
                        selectedProduct.id === product.id
                          ? "border-high-vis-orange bg-surface-container-low"
                          : "border-outline-variant hover:border-primary"
                      }`}
                    >
                      <span className="block truncate text-xs font-bold text-primary">{product.name}</span>
                      <span className="mt-1 block font-mono text-[10px] text-secondary">
                        {product.sku || "No SKU"} / {product.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border border-outline-variant bg-white p-5">
                <div className="mb-6 flex flex-col gap-3 border-b border-outline-variant pb-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-primary">编辑产品</h2>
                    <p className="font-mono text-[10px] uppercase text-secondary">{selectedProduct.id}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteProduct(selectedProduct.id)}
                    className="flex items-center gap-2 border border-red-300 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={14} />
                    删除产品
                  </button>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="产品名称">
                    <input
                      value={selectedProduct.name}
                      onChange={(event) => updateProduct(selectedProduct.id, { name: event.target.value })}
                      className="admin-input"
                    />
                  </Field>
                  <Field label="SKU / 型号">
                    <input
                      value={selectedProduct.sku}
                      onChange={(event) => updateProduct(selectedProduct.id, { sku: event.target.value })}
                      className="admin-input"
                    />
                  </Field>
                  <Field label="产品 ID">
                    <input
                      value={selectedProduct.id}
                      onChange={(event) => {
                        const nextId = event.target.value.trim();
                        updateProduct(selectedProduct.id, { id: nextId });
                        setSelectedProductId(nextId);
                      }}
                      className="admin-input"
                    />
                  </Field>
                  <Field label="分类">
                    <select
                      value={selectedProduct.category}
                      onChange={(event) => updateProduct(selectedProduct.id, { category: event.target.value })}
                      className="admin-input"
                    >
                      {categories.map((category) => (
                        <option key={category.slug} value={category.slug}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="材质">
                    <input
                      value={selectedProduct.material}
                      onChange={(event) => updateProduct(selectedProduct.id, { material: event.target.value })}
                      className="admin-input"
                    />
                  </Field>
                  <Field label="容量 / MOQ / 交期">
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="number"
                        value={selectedProduct.capacity}
                        onChange={(event) => updateProduct(selectedProduct.id, { capacity: asNumber(event.target.value) })}
                        className="admin-input"
                        placeholder="容量"
                      />
                      <input
                        type="number"
                        value={selectedProduct.moq}
                        onChange={(event) => updateProduct(selectedProduct.id, { moq: asNumber(event.target.value) })}
                        className="admin-input"
                        placeholder="MOQ"
                      />
                      <input
                        type="number"
                        value={selectedProduct.leadTime}
                        onChange={(event) => updateProduct(selectedProduct.id, { leadTime: asNumber(event.target.value) })}
                        className="admin-input"
                        placeholder="天数"
                      />
                    </div>
                  </Field>
                  <Field label="标签">
                    <div className="flex gap-4 pt-3 text-sm text-secondary">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={Boolean(selectedProduct.isNew)}
                          onChange={(event) => updateProduct(selectedProduct.id, { isNew: event.target.checked })}
                        />
                        新品
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={Boolean(selectedProduct.isBest)}
                          onChange={(event) => updateProduct(selectedProduct.id, { isBest: event.target.checked })}
                        />
                        热销
                      </label>
                    </div>
                  </Field>
                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-[1fr_220px]">
                  <Field label="主图 URL">
                    <input
                      value={selectedProduct.image}
                      onChange={(event) => updateProduct(selectedProduct.id, { image: event.target.value })}
                      className="admin-input"
                    />
                    <ImageUpload
                      label="上传主图"
                      onChange={async (file, event) => {
                        const url = await uploadImage(file, "products");
                        updateProduct(selectedProduct.id, {
                          image: url,
                          galleryImages: [url, ...(selectedProduct.galleryImages || []).filter((item) => item !== url)],
                        });
                        event.currentTarget.value = "";
                      }}
                    />
                  </Field>
                  <PreviewImage src={selectedProduct.image} alt={selectedProduct.name} />
                </div>

                <Field label="详情页参数区域内容">
                  <textarea
                    rows={4}
                    value={selectedProduct.description || ""}
                    onChange={(event) => updateProduct(selectedProduct.id, { description: event.target.value })}
                    className="admin-input"
                    placeholder="填写后会显示在产品详情页下方的 Technical Parameters 区域。留空时显示系统默认参数表。"
                  />
                </Field>

                <div className="mt-6 border-t border-outline-variant pt-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-primary">主图特色标签</h3>
                      <p className="mt-1 text-xs leading-relaxed text-secondary">
                        控制产品详情页第一张主图上的橙色热点标签。Top / Left 使用百分比，例如 50%。
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => applyCategoryHotspots(selectedProduct.id)}
                        className="border border-outline-variant px-3 py-2 text-xs font-bold text-primary hover:border-high-vis-orange"
                      >
                        使用分类默认
                      </button>
                      <button
                        type="button"
                        onClick={() => addProductHotspot(selectedProduct.id)}
                        className="flex items-center gap-1 bg-primary px-3 py-2 text-xs font-bold text-white hover:bg-high-vis-orange"
                      >
                        <PackagePlus size={14} />
                        添加标签
                      </button>
                    </div>
                  </div>

                  {(selectedProduct.hotspots || []).length === 0 ? (
                    <div className="mt-4 border border-dashed border-outline-variant bg-surface-container-low px-4 py-5 text-sm text-secondary">
                      当前产品未设置单独特色标签，前台会使用所属分类的默认标签。点击“使用分类默认”可复制后再编辑。
                    </div>
                  ) : (
                    <div className="mt-4 space-y-4">
                      {(selectedProduct.hotspots || []).map((hotspot, index) => (
                        <div
                          key={`${selectedProduct.id}-hotspot-${index}`}
                          className="border border-outline-variant bg-surface-container-low p-4"
                        >
                          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-high-vis-orange">
                              Hotspot {index + 1}
                            </span>
                            <div className="flex flex-wrap items-center gap-3">
                              <label className="flex min-h-10 items-center gap-2 text-xs font-bold text-secondary">
                                <input
                                  type="checkbox"
                                  checked={hotspot.active !== false}
                                  onChange={(event) =>
                                    updateProductHotspot(selectedProduct.id, index, { active: event.target.checked })
                                  }
                                />
                                启用
                              </label>
                              <button
                                type="button"
                                onClick={() => deleteProductHotspot(selectedProduct.id, index)}
                                className="flex min-h-10 items-center gap-1 border border-red-300 px-3 text-xs font-bold text-red-600 hover:bg-red-50"
                              >
                                <Trash2 size={13} />
                                删除
                              </button>
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <label className="block">
                              <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-secondary">
                                标题
                              </span>
                              <input
                                value={hotspot.title}
                                onChange={(event) =>
                                  updateProductHotspot(selectedProduct.id, index, { title: event.target.value })
                                }
                                className="admin-input"
                              />
                            </label>
                            <label className="block">
                              <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-secondary">
                                编号 / POS
                              </span>
                              <input
                                value={hotspot.code}
                                onChange={(event) =>
                                  updateProductHotspot(selectedProduct.id, index, { code: event.target.value })
                                }
                                className="admin-input font-mono text-xs"
                              />
                            </label>
                            <label className="block">
                              <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-secondary">
                                Top 位置
                              </span>
                              <input
                                value={hotspot.top}
                                onChange={(event) =>
                                  updateProductHotspot(selectedProduct.id, index, { top: event.target.value })
                                }
                                className="admin-input font-mono text-xs"
                                placeholder="50%"
                              />
                            </label>
                            <label className="block">
                              <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-secondary">
                                Left 位置
                              </span>
                              <input
                                value={hotspot.left}
                                onChange={(event) =>
                                  updateProductHotspot(selectedProduct.id, index, { left: event.target.value })
                                }
                                className="admin-input font-mono text-xs"
                                placeholder="50%"
                              />
                            </label>
                          </div>

                          <label className="mt-4 block">
                            <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-secondary">
                              描述内容
                            </span>
                            <textarea
                              rows={3}
                              value={hotspot.desc}
                              onChange={(event) =>
                                updateProductHotspot(selectedProduct.id, index, { desc: event.target.value })
                              }
                              className="admin-input"
                            />
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Field label="产品图库 URL（一行一张，第一行建议为主图）">
                  <textarea
                    rows={6}
                    value={(selectedProduct.galleryImages || [selectedProduct.image]).join("\n")}
                    onChange={(event) =>
                      updateProduct(selectedProduct.id, { galleryImages: splitLines(event.target.value) })
                    }
                    className="admin-input font-mono text-xs"
                  />
                  <ImageUpload
                    label="上传并追加到图库"
                    onChange={async (file, event) => {
                      const url = await uploadImage(file, "products");
                      updateProduct(selectedProduct.id, {
                        galleryImages: [...(selectedProduct.galleryImages || [selectedProduct.image]), url],
                      });
                      event.currentTarget.value = "";
                    }}
                  />
                </Field>
              </div>
            </section>
          )}

          {activeTab === "categories" && selectedCategory && (
            <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
              <div className="border border-outline-variant bg-white p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-primary">分类列表</h2>
                  <button type="button" onClick={addCategory} className="bg-primary px-3 py-2 text-xs font-bold text-white">
                    添加分类
                  </button>
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.slug}
                      type="button"
                      onClick={() => setSelectedCategorySlug(category.slug)}
                      className={`w-full border p-3 text-left ${
                        selectedCategory.slug === category.slug
                          ? "border-high-vis-orange bg-surface-container-low"
                          : "border-outline-variant"
                      }`}
                    >
                      <span className="block text-sm font-bold text-primary">{category.name}</span>
                      <span className="font-mono text-[10px] text-secondary">{category.slug}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="border border-outline-variant bg-white p-5">
                <div className="mb-6 flex items-center justify-between border-b border-outline-variant pb-5">
                  <h2 className="text-lg font-bold text-primary">编辑分类</h2>
                  <button
                    type="button"
                    onClick={() => deleteCategory(selectedCategory.slug)}
                    className="flex items-center gap-2 border border-red-300 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={14} />
                    删除分类
                  </button>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="分类名称">
                    <input
                      value={selectedCategory.name}
                      onChange={(event) => updateCategory(selectedCategory.slug, { name: event.target.value })}
                      className="admin-input"
                    />
                  </Field>
                  <Field label="分类 Slug">
                    <input
                      value={selectedCategory.slug}
                      onChange={(event) => {
                        const slug = makeSlug(event.target.value);
                        updateCategory(selectedCategory.slug, { slug });
                        setSelectedCategorySlug(slug);
                      }}
                      className="admin-input"
                    />
                  </Field>
                  <Field label="排序">
                    <input
                      type="number"
                      value={selectedCategory.sortOrder}
                      onChange={(event) => updateCategory(selectedCategory.slug, { sortOrder: asNumber(event.target.value) })}
                      className="admin-input"
                    />
                  </Field>
                  <Field label="是否显示">
                    <label className="mt-3 flex items-center gap-2 text-sm text-secondary">
                      <input
                        type="checkbox"
                        checked={selectedCategory.visible}
                        onChange={(event) => updateCategory(selectedCategory.slug, { visible: event.target.checked })}
                      />
                      在前台分类筛选和首页分类里显示
                    </label>
                  </Field>
                </div>
                <div className="mt-5 grid gap-5 md:grid-cols-[1fr_220px]">
                  <Field label="分类图片 URL">
                    <input
                      value={selectedCategory.image}
                      onChange={(event) => updateCategory(selectedCategory.slug, { image: event.target.value })}
                      className="admin-input"
                    />
                    <ImageUpload
                      label="上传分类图片"
                      onChange={async (file, event) => {
                        const url = await uploadImage(file, "categories");
                        updateCategory(selectedCategory.slug, { image: url });
                        event.currentTarget.value = "";
                      }}
                    />
                  </Field>
                  <PreviewImage src={selectedCategory.image} alt={selectedCategory.name} />
                </div>
                <Field label="分类描述">
                  <textarea
                    rows={4}
                    value={selectedCategory.description || ""}
                    onChange={(event) => updateCategory(selectedCategory.slug, { description: event.target.value })}
                    className="admin-input"
                  />
                </Field>
              </div>
            </section>
          )}

          {activeTab === "contact" && (
            <section className="border border-outline-variant bg-white p-5">
              <h2 className="mb-6 border-b border-outline-variant pb-5 text-lg font-bold text-primary">
                联系方式管理
              </h2>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="电话">
                  <input
                    value={siteSettings.contact.phone}
                    onChange={(event) => updateContact({ phone: event.target.value })}
                    className="admin-input"
                  />
                </Field>
                <Field label="WhatsApp">
                  <input
                    value={siteSettings.contact.whatsapp}
                    onChange={(event) => updateContact({ whatsapp: event.target.value })}
                    className="admin-input"
                  />
                </Field>
                <Field label="邮箱">
                  <input
                    value={siteSettings.contact.email}
                    onChange={(event) => updateContact({ email: event.target.value })}
                    className="admin-input"
                  />
                </Field>
                <Field label="地图标签">
                  <input
                    value={siteSettings.contact.plantLabel}
                    onChange={(event) => updateContact({ plantLabel: event.target.value })}
                    className="admin-input"
                  />
                </Field>
              </div>
              <Field label="地址（一行一段）">
                <textarea
                  rows={5}
                  value={siteSettings.contact.addressLines.join("\n")}
                  onChange={(event) => updateContact({ addressLines: splitLines(event.target.value) })}
                  className="admin-input"
                />
              </Field>
              <Field label="Google Map 嵌入链接">
                <input
                  value={siteSettings.contact.mapEmbedUrl}
                  onChange={(event) => updateContact({ mapEmbedUrl: event.target.value })}
                  className="admin-input"
                />
              </Field>
            </section>
          )}

          {activeTab === "branding" && (
            <section className="border border-outline-variant bg-white p-5">
              <h2 className="mb-6 border-b border-outline-variant pb-5 text-lg font-bold text-primary">
                Logo 和网站名称管理
              </h2>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="网站名称">
                  <input
                    value={siteSettings.siteName}
                    onChange={(event) => updateSettings({ siteName: event.target.value })}
                    className="admin-input"
                  />
                </Field>
                <Field label="浏览器图标 URL">
                  <input
                    value={siteSettings.faviconUrl}
                    onChange={(event) => updateSettings({ faviconUrl: event.target.value })}
                    className="admin-input"
                  />
                </Field>
              </div>
              <div className="mt-5 grid gap-5 md:grid-cols-[1fr_220px]">
                <Field label="Logo 图片 URL">
                  <input
                    value={siteSettings.logoUrl}
                    onChange={(event) => updateSettings({ logoUrl: event.target.value })}
                    className="admin-input"
                  />
                  <ImageUpload
                    label="上传 Logo"
                    onChange={async (file, event) => {
                      const url = await uploadImage(file, "branding");
                      updateSettings({ logoUrl: url, faviconUrl: url });
                      event.currentTarget.value = "";
                    }}
                  />
                </Field>
                <PreviewImage src={siteSettings.logoUrl} alt={siteSettings.siteName} />
              </div>
            </section>
          )}

          {activeTab === "password" && (
            <section className="border border-outline-variant bg-white p-5">
              <h2 className="mb-6 border-b border-outline-variant pb-5 text-lg font-bold text-primary">
                管理员密码设置
              </h2>
              <form onSubmit={handlePasswordChange} className="max-w-xl">
                <Field label="当前后台密码">
                  <input
                    type="password"
                    value={currentAdminPassword}
                    onChange={(event) => setCurrentAdminPassword(event.target.value)}
                    className="admin-input"
                    autoComplete="current-password"
                  />
                </Field>
                <Field label="新后台密码">
                  <input
                    type="password"
                    value={newAdminPassword}
                    onChange={(event) => setNewAdminPassword(event.target.value)}
                    className="admin-input"
                    autoComplete="new-password"
                    placeholder="至少 8 个字符"
                  />
                </Field>
                <Field label="确认新密码">
                  <input
                    type="password"
                    value={confirmAdminPassword}
                    onChange={(event) => setConfirmAdminPassword(event.target.value)}
                    className="admin-input"
                    autoComplete="new-password"
                  />
                </Field>
                <p className="mt-4 text-xs leading-relaxed text-secondary">
                  修改成功后，当前浏览器会自动切换为新密码；其他设备需要用新密码重新登录后台。
                </p>
                <button
                  type="submit"
                  disabled={changingPassword}
                  className="mt-5 flex min-h-11 items-center justify-center gap-2 bg-primary px-5 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-high-vis-orange disabled:opacity-60"
                >
                  {changingPassword ? <Loader2 size={15} className="animate-spin" /> : <KeyRound size={15} />}
                  修改密码
                </button>
              </form>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="mt-4 block">
      <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-secondary">
        {label}
      </span>
      {children}
    </label>
  );
}

function PreviewImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex h-40 items-center justify-center border border-outline-variant bg-surface-container-low p-3">
      {src ? (
        <img src={src} alt={alt} className="max-h-full max-w-full object-contain" />
      ) : (
        <span className="text-xs text-secondary">暂无图片</span>
      )}
    </div>
  );
}

function ImageUpload({
  label,
  onChange,
}: {
  label: string;
  onChange: (file: File | undefined, event: ChangeEvent<HTMLInputElement>) => Promise<void>;
}) {
  return (
    <div className="mt-2 flex items-center gap-2">
      <label className="inline-flex cursor-pointer items-center gap-2 border border-outline-variant px-3 py-2 text-xs font-bold text-primary hover:border-high-vis-orange">
        <Upload size={14} />
        {label}
        <input
          type="file"
          accept="image/*,.ico"
          className="hidden"
          onChange={(event) => {
            void onChange(event.currentTarget.files?.[0], event);
          }}
        />
      </label>
      <span className="flex items-center gap-1 text-[11px] text-secondary">
        <ImagePlus size={12} />
        支持 jpg/png/webp/ico
      </span>
    </div>
  );
}
