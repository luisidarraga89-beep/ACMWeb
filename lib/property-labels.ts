/**
 * lib/property-labels.ts
 * Shared display labels for property enums — single source of truth so the
 * filter panel, cards and any other view render the same wording.
 */
import { PropertyType, PropertyAmenity, PropertyCondition } from "@/types/property";

export const PROPERTY_TYPE_LABEL: Record<PropertyType, string> = {
  apartamento:    "Apartamento",
  apartaestudio:  "Apartaestudio",
  casa:           "Casa",
  "casa-campestre": "Casa campestre",
  penthouse:      "Penthouse",
  duplex:         "Dúplex",
  finca:          "Finca",
  lote:           "Lote",
  oficina:        "Oficina",
  local:          "Local comercial",
  bodega:         "Bodega",
  parqueadero:    "Parqueadero",
  edificio:       "Edificio",
  consultorio:    "Consultorio",
};

export const PROPERTY_CONDITION_LABEL: Record<PropertyCondition, string> = {
  nueva: "Nueva",
  usada: "Usada",
};

export const PROPERTY_AMENITY_LABEL: Record<PropertyAmenity, string> = {
  balcon:              "Balcón",
  terraza:             "Terraza",
  garaje:              "Garaje",
  piscina:             "Piscina",
  ascensor:            "Ascensor",
  amoblada:            "Amoblada",
  gimnasio:            "Gimnasio",
  "zona-social":       "Zona social",
  vigilancia:          "Vigilancia 24 h",
  deposito:            "Depósito / cuarto útil",
  "aire-acondicionado":"Aire acondicionado",
  chimenea:            "Chimenea",
  "vista-panoramica":  "Vista panorámica",
  "zonas-verdes":      "Zonas verdes",
  cancha:              "Cancha deportiva",
  bbq:                 "Zona BBQ",
};
