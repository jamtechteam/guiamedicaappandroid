// archivo que devuelve los items del menu

// interface de los items del menu
export interface IMenuItem {
  id: number;
  title: string;
  icon: string;
  to: string | null;
}

// items del menu
export const menuItems: IMenuItem[] = [];
