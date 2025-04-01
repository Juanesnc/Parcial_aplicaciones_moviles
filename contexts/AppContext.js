// src/contexts/AppContext.js
import React, { useState } from 'react';
import { loginUser, registerUser } from '../firebase/firebaseConfig';

// Datos iniciales (puedes agregar recetas si lo deseas)
const initialRecipes = [
  {
    id: 1,
    name: 'Hamburguesa Clásica',
    description: 'Jugosa hamburguesa preparada con carne de res molida sazonada, queso cheddar derretido, lechuga crujiente, tomate fresco y cebolla caramelizada, todo en un pan tostado al carbón.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    ingredients: [
      '150g de carne molida de res',
      '1 pan de hamburguesa artesanal',
      '1 hoja de lechuga romana',
      '1 rodaja de tomate maduro',
      '1 rebanada de queso cheddar',
      '¼ de cebolla morada en juliana',
      '1 cucharada de aceite de oliva',
      'Sal y pimienta al gusto',
      'Salsa de mostaza y miel (opcional)'
    ],
    recipe: '1. En un tazón, mezcla la carne molida con sal y pimienta. Forma una bola y aplástala para crear un disco de 1.5cm de grosor.\n2. Calienta una sartén de hierro a fuego medio-alto. Agrega aceite de oliva y cocina la hamburguesa 3 minutos por lado.\n3. Coloca el queso sobre la carne en los últimos 30 segundos para que se derrita.\n4. Tuesta el pan en la sartén durante 1 minuto por lado.\n5. Monta la hamburguesa: base de mayonesa, lechuga, tomate sazonado con sal, cebolla caramelizada y la carne con queso.',
    region: 'Asia'
  },
  {
    id: 2,
    name: 'Pizza Margherita',
    description: 'Clásica pizza napolitana con base de salsa de tomates San Marzano, mozzarella fresca de búfala y hojas de albahaca.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Pizza_Margherita_stu_spivack.jpg/800px-Pizza_Margherita_stu_spivack.jpg',
    ingredients: [
      '200g de masa para pizza (harina 00)',
      '100ml de salsa de tomate San Marzano',
      '150g de mozzarella de búfala',
      '10 hojas de albahaca fresca',
      '1 diente de ajo triturado',
      'Aceite de oliva virgen extra',
      'Sal marina en escamas'
    ],
    recipe: '1. Prepara la masa: Mezcla 200g de harina 00 con 100ml de agua tibia, 1 cucharadita de levadura y sal. Amasa 10 minutos y deja reposar 1 hora.\n2. Estira la masa en forma circular (0.5cm de grosor). Unta la salsa de tomate con ayuda de una cuchara.\n3. Corta la mozzarella en cubos pequeños y distribúyela sobre la salsa.\n4. Hornea a 250°C (con piedra para pizza) durante 8-10 minutos.\n5. Retira del horno, agrega albahaca fresca, ajo triturado y un chorrito de aceite de oliva.',
    region: 'África'
  },
  {
    id: 3,
    name: 'Sushi Variado',
    description: 'Selección de sushi con nigiri de salmón, maki de pepino y temaki de cangrejo.',
    image: 'https://content-cocina.lecturas.com/medio/2018/07/19/sushi-variado-tradicional_91be2c41_800x800.jpg',
    ingredients: [
      '2 tazas de arroz japonés',
      '4 hojas de nori',
      '200g de salmón fresco',
      '150g de atún',
      '1 pepino japonés',
      '1 aguacate',
      '100ml de vinagre de arroz',
      '2 cucharadas de azúcar',
      'Wasabi y jengibre encurtido'
    ],
    recipe: '1. Lava el arroz hasta que el agua salga clara. Cocínalo con agua y una pizca de sal.\n2. Mezcla vinagre de arroz con azúcar (1:1) y vierte sobre el arroz caliente. Deja enfriar.\n3. Corta el pescado en tiras finas (0.5cm de grosor) con un cuchillo afilado.\n4. Para los maki: Coloca nori en la esterilla, extiende arroz, agrega pepino y enrolla con presión.\n5. Para nigiri: Forma bolas de arroz, coloca una tira de salmón encima y presiona suavemente.\n6. Sirve con wasabi, jengibre y salsa de soja.',
    region: 'Oceanía'
  },
  {
    id: 4,
    name: 'Ensalada César',
    description: 'Ensalada icónica con pollo grillado, crutones dorados y aderezo cremoso.',
    image: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/b876d8ea-fc9b-4b04-9958-9c70fe1c74e0/Derivates/fb3399fa-df15-4d0d-9beb-83a79a37a16e.jpg',
    ingredients: [
      '1 pechuga de pollo entera',
      '1 cabeza de lechuga romana',
      '50g de queso parmesano rallado',
      '1 taza de crutones integrales',
      '2 dientes de ajo',
      '1 huevo',
      '1 cucharada de mostaza Dijon',
      '60ml de aceite de oliva',
      'Jugo de ½ limón'
    ],
    recipe: '1. Marinado del pollo: Mezcla ajo picado, jugo de limón, sal y pimienta. Sumerge la pechuga y deja reposar 20 minutos.\n2. Cocina el pollo a la plancha 5-6 minutos por lado. Deja reposar y corta en tiras.\n3. Prepara el aderezo: Mezcla huevo, mostaza, jugo de limón y aceite de oliva hasta emulsionar.\n4. En un tazón grande, mezcla lechuga troceada, crutones y queso.\n5. Agrega el pollo y el aderezo. Mezcla suavemente antes de servir.',
    region: 'América del Norte'
  },
  {
    id: 5,
    name: 'Tacos de Carnitas',
    description: 'Tacos mexicanos con cerdo desmenuzado cocido en naranja y especias.',
    image: 'https://cielitorosado.com/wp-content/uploads/2022/11/CARNITAS-sm.jpg',
    ingredients: [
      '500g de pierna de cerdo',
      '2 naranjas',
      '1 cebolla blanca',
      '2 chiles guajillos',
      '8 tortillas de maíz',
      '1 cucharada de comino',
      '1 hoja de laurel',
      'Sal al gusto'
    ],
    recipe: '1. Corta el cerdo en cubos grandes. En una olla, cocina con cebolla, chiles, comino, laurel y sal.\n2. Vierte jugo de naranja hasta cubrir la carne. Cocina a fuego lento 2 horas.\n3. Retira la carne y desmenuza con tenedores. Dora en su propia grasa 5 minutos.\n4. Calienta las tortillas en un comal. Sirve con salsa verde (chiles, cilantro y limón).',
    region: 'América del Sur'
  },
  {
    id: 6,
    name: 'Sopa de Pollo y Fideos',
    description: 'Caldo de pollo con fideos delgados y verduras frescas.',
    image: 'https://s1.elespanol.com/2020/01/08/cocinillas/recetas/sopas-y-cremas/caldo-pollo-fideos_458216170_142008624_1706x1280.jpg',
    ingredients: [
      '1 pollo entero',
      '2 zanahorias',
      '2 tallos de apio',
      '1 taza de fideos cabello de ángel',
      '1 cebolla',
      '3 dientes de ajo',
      '2 hojas de laurel',
      'Sal y pimienta blanca'
    ],
    recipe: '1. Hierve el pollo con cebolla, apio, zanahorias, ajo y laurel durante 1h30m.\n2. Retira el pollo y desmenuza la carne. Cuela el caldo.\n3. Regresa el caldo a la olla, agrega zanahoria y apio picados. Cocina 10 minutos.\n4. Añade los fideos y cocina 3-4 minutos. Incorpora el pollo desmenuzado.\n5. Rectifica sazón con sal y pimienta blanca.',
    region: 'Antártida'
  },
  {
    id: 7,
    name: 'Tiramisú Clásico',
    description: 'Postre italiano con capas de café, mascarpone y cacao.',
    image: 'https://www.haceloconhuevos.com/wp-content/uploads/2022/02/Tiramisu%CC%81-cla%CC%81sico.jpg',
    ingredients: [
      '500g de mascarpone',
      '200ml de café expreso',
      '200g de bizcochos savoiardi',
      '3 huevos',
      '100g de azúcar',
      'Cacao amargo en polvo'
    ],
    recipe: '1. Separa las yemas de las claras. Bate las yemas con azúcar hasta obtener una crema.\n2. Incorpora el mascarpone en la mezcla de yemas.\n3. Bate las claras a punto de nieve e intégralas con movimientos envolventes.\n4. Empapa los bizcochos en café y forma una capa en un molde.\n5. Alterna capas de crema y bizcochos. Refrigera 4 horas. Espolvorea cacao antes de servir.',
    region: 'Centroamérica'
  },
  {
    id: 8,
    name: 'Panqueques con Miel y Frutas',
    description: 'Panqueques esponjosos con frutas frescas y miel de agave.',
    image: 'https://www.tqma.com.ec/images/com_yoorecipe/banner_superior/17784_1.jpg',
    ingredients: [
      '150g de harina integral',
      '250ml de leche de almendras',
      '1 plátano maduro',
      '1 taza de fresas',
      '1 kiwi',
      '1 cucharada de aceite de coco',
      '1 cucharadita de polvo para hornear',
      'Miel de agave al gusto'
    ],
    recipe: '1. Mezcla harina, polvo para hornear y una pizca de sal.\n2. En otro tazón, machaca el plátano con leche de almendras y aceite de coco.\n3. Combina ambas mezclas y deja reposar 10 minutos.\n4. Cocina en sartén antiadherente a fuego medio-bajo.\n5. Sirve con rodajas de kiwi, fresas y miel de agave.',
    region: 'Caribe'
  }
];

export const AppContext = React.createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState(initialRecipes);
  const [favorites, setFavorites] = useState([]);
  const [planner, setPlanner] = useState([]);
  const [comments, setComments] = useState({});
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  // Función para iniciar sesión usando Firebase Authentication
  const signIn = async (email, password) => {
    try {
      const userData = await loginUser(email, password);
      setUser(userData);
      console.log("Usuario logueado:", userData);
    } catch (error) {
      alert('Credenciales inválidas');
      console.error("Error en inicio de sesión:", error);
    }
  };

  // Función para registrar usuario usando Firebase Authentication
  const signUp = async (username, email, password) => {
    if (!username || !email || !password) {
      alert('Por favor completa todos los campos');
      return;
    }
    try {
      const userData = await registerUser(email, password);
      // Puedes agregar el username manualmente al objeto del usuario
      setUser({ ...userData, username });
      console.log("Usuario registrado:", userData);
    } catch (error) {
      alert('Error al registrar el usuario: ' + error.message);
      console.error("Error en registro:", error);
    }
  };

  const signOut = () => {
    setUser(null);
  };


  // Funciones para favoritos
  const addFavorite = (recipe) => setFavorites([...favorites, recipe]);
  const removeFavorite = (recipe) => setFavorites(favorites.filter(fav => fav.id !== recipe.id));

  // Funciones para planificador
  const addToPlanner = (recipe) => setPlanner([...planner, recipe]);
  const removeFromPlanner = (recipe) => setPlanner(planner.filter(plan => plan.id !== recipe.id));

  // Función para comentarios
  const addComment = (recipeId, comment) => {
    setComments({
      ...comments,
      [recipeId]: comments[recipeId] ? [...comments[recipeId], comment] : [comment],
    });
  };

  // Función para crear recetas
  const addRecipe = (newRecipe) => setRecipes([...recipes, newRecipe]);

  // Funciones para mostrar/ocultar modal de perfil
  const openProfileModal = () => setProfileModalVisible(true);
  const closeProfileModal = () => setProfileModalVisible(false);

  const appContextValue = {
    user,
    signIn,
    signUp,
    signOut,
    recipes,
    addRecipe,
    favorites,
    addFavorite,
    removeFavorite,
    planner,
    addToPlanner,
    removeFromPlanner,
    comments,
    addComment,
    openProfileModal,
    closeProfileModal,
    profileModalVisible,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
}
