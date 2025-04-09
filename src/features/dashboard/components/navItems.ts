import {
    Home,
    Calendar,
    CalendarCheck,
    CalendarPlus,
    Users,
    UserPlus,
    ChevronsLeftRightIcon,

  } from "lucide-react";

  export const navItems = [
    {
      label: "General",
      items: [
        {
          label: "Inicio",
          icon: Home,
          path: "/dashboard/profesional",
          exact: true,
        },
      ],
    },
    {
      label: "Gestión",
      items: [
        {
          label: "Turnos",
          icon: Calendar,
          path: "/dashboard/profesional/turnos",
          children: [
            {
              label: "Ver turnos",
              icon: CalendarCheck,
              path: "/dashboard/profesional/turnos",
              exact: true,
            },
            {
              label: "Nuevo turno",
              icon: CalendarPlus,
              path: "/dashboard/profesional/turnos/nuevo",
              exact: true,
            },
          ],
        },
        {
          label: "Pacientes",
          icon: Users,
          path: "/dashboard/profesional/pacientes",
          children: [
            {
              label: "Ver pacientes",
              icon: Users,
              path: "/dashboard/profesional/pacientes",
              exact: true,
            },
            {
              label: "Nuevo paciente",
              icon: UserPlus,
              path: "/dashboard/profesional/pacientes/nuevo",
              exact: true,
            },
          ],
        },
      ],
    },
    {
      label: "Opciones",
      items: [
        {
          label: "Configuración",
          icon: ChevronsLeftRightIcon,
          path: "/dashboard/profesional/configuracion",
          exact: true,
        },
      ],
    },
  ];
  