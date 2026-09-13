/**
 * content/colombia-locations.ts
 * Departamentos de Colombia y sus municipios/ciudades principales — usado
 * para el filtro de ubicación en cascada (Departamento → Ciudad) en
 * /propiedades. Cubre todo el país porque ACM puede gestionar propiedades
 * en cualquier parte de Colombia, no solo donde ya hay publicaciones.
 */

export interface ColombiaDepartment {
  name:   string;
  cities: string[];
}

export const COLOMBIA_LOCATIONS: ColombiaDepartment[] = [
  { name: "Bogotá D.C.",        cities: ["Bogotá"] },
  { name: "Amazonas",           cities: ["Leticia", "Puerto Nariño"] },
  { name: "Antioquia",          cities: ["Medellín", "Envigado", "Itagüí", "Bello", "Rionegro", "Sabaneta", "La Estrella", "Turbo", "Apartadó", "Caucasia"] },
  { name: "Arauca",             cities: ["Arauca", "Saravena", "Tame"] },
  { name: "Atlántico",          cities: ["Barranquilla", "Soledad", "Malambo", "Puerto Colombia", "Sabanalarga"] },
  { name: "Bolívar",            cities: ["Cartagena", "Magangué", "Turbaco", "Arjona"] },
  { name: "Boyacá",             cities: ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá", "Paipa"] },
  { name: "Caldas",             cities: ["Manizales", "La Dorada", "Chinchiná", "Villamaría"] },
  { name: "Caquetá",            cities: ["Florencia", "San Vicente del Caguán"] },
  { name: "Casanare",           cities: ["Yopal", "Aguazul", "Villanueva"] },
  { name: "Cauca",              cities: ["Popayán", "Santander de Quilichao", "Puerto Tejada"] },
  { name: "Cesar",              cities: ["Valledupar", "Aguachica", "Agustín Codazzi"] },
  { name: "Chocó",              cities: ["Quibdó", "Istmina"] },
  { name: "Córdoba",            cities: ["Montería", "Cereté", "Lorica", "Sahagún"] },
  { name: "Cundinamarca",       cities: ["Soacha", "Chía", "Cajicá", "Zipaquirá", "Facatativá", "Fusagasugá", "Cota", "Mosquera", "Madrid", "Funza", "La Calera", "Girardot", "Tocancipá", "Sopó", "Tabio", "Tenjo"] },
  { name: "Guainía",            cities: ["Inírida"] },
  { name: "Guaviare",           cities: ["San José del Guaviare"] },
  { name: "Huila",              cities: ["Neiva", "Pitalito", "Garzón"] },
  { name: "La Guajira",         cities: ["Riohacha", "Maicao", "Uribia"] },
  { name: "Magdalena",          cities: ["Santa Marta", "Ciénaga", "Fundación"] },
  { name: "Meta",               cities: ["Villavicencio", "Acacías", "Granada"] },
  { name: "Nariño",             cities: ["Pasto", "Ipiales", "Tumaco"] },
  { name: "Norte de Santander", cities: ["Cúcuta", "Ocaña", "Pamplona"] },
  { name: "Putumayo",           cities: ["Mocoa", "Puerto Asís"] },
  { name: "Quindío",            cities: ["Armenia", "Calarcá", "Montenegro"] },
  { name: "Risaralda",          cities: ["Pereira", "Dosquebradas", "Santa Rosa de Cabal"] },
  { name: "San Andrés y Providencia", cities: ["San Andrés", "Providencia"] },
  { name: "Santander",          cities: ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta", "Barrancabermeja"] },
  { name: "Sucre",              cities: ["Sincelejo", "Corozal"] },
  { name: "Tolima",             cities: ["Ibagué", "Espinal", "Melgar", "Honda"] },
  { name: "Valle del Cauca",    cities: ["Cali", "Palmira", "Buenaventura", "Tuluá", "Buga", "Jamundí", "Yumbo"] },
  { name: "Vaupés",             cities: ["Mitú"] },
  { name: "Vichada",            cities: ["Puerto Carreño"] },
];

export function getCitiesByDepartment(department: string): string[] {
  return COLOMBIA_LOCATIONS.find((d) => d.name === department)?.cities ?? [];
}
