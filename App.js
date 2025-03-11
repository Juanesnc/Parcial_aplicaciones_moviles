import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useLayoutEffect, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// ----- Datos iniciales de recetas -----
const initialRecipes = [
  {
    id: '1',
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
    recipe: '1. En un tazón, mezcla la carne molida con sal y pimienta. Forma una bola y aplástala para crear un disco de 1.5cm de grosor.\n2. Calienta una sartén de hierro a fuego medio-alto. Agrega aceite de oliva y cocina la hamburguesa 3 minutos por lado.\n3. Coloca el queso sobre la carne en los últimos 30 segundos para que se derrita.\n4. Tuesta el pan en la sartén durante 1 minuto por lado.\n5. Monta la hamburguesa: base de mayonesa, lechuga, tomate sazonado con sal, cebolla caramelizada y la carne con queso.'
  },
  {
    id: '2',
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
    recipe: '1. Prepara la masa: Mezcla 200g de harina 00 con 100ml de agua tibia, 1 cucharadita de levadura y sal. Amasa 10 minutos y deja reposar 1 hora.\n2. Estira la masa en forma circular (0.5cm de grosor). Unta la salsa de tomate con ayuda de una cuchara.\n3. Corta la mozzarella en cubos pequeños y distribúyela sobre la salsa.\n4. Hornea a 250°C (con piedra para pizza) durante 8-10 minutos.\n5. Retira del horno, agrega albahaca fresca, ajo triturado y un chorrito de aceite de oliva.'
  },
  {
    id: '3',
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
    recipe: '1. Lava el arroz hasta que el agua salga clara. Cocínalo con agua y una pizca de sal.\n2. Mezcla vinagre de arroz con azúcar (1:1) y vierte sobre el arroz caliente. Deja enfriar.\n3. Corta el pescado en tiras finas (0.5cm de grosor) con un cuchillo afilado.\n4. Para los maki: Coloca nori en la esterilla, extiende arroz, agrega pepino y enrolla con presión.\n5. Para nigiri: Forma bolas de arroz, coloca una tira de salmón encima y presiona suavemente.\n6. Sirve con wasabi, jengibre y salsa de soja.'
  },
  {
    id: '4',
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
    recipe: '1. Marinado del pollo: Mezcla ajo picado, jugo de limón, sal y pimienta. Sumerge la pechuga y deja reposar 20 minutos.\n2. Cocina el pollo a la plancha 5-6 minutos por lado. Deja reposar y corta en tiras.\n3. Prepara el aderezo: Mezcla huevo, mostaza, jugo de limón y aceite de oliva hasta emulsionar.\n4. En un tazón grande, mezcla lechuga troceada, crutones y queso.\n5. Agrega el pollo y el aderezo. Mezcla suavemente antes de servir.'
  },
  {
    id: '5',
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
    recipe: '1. Corta el cerdo en cubos grandes. En una olla, cocina con cebolla, chiles, comino, laurel y sal.\n2. Vierte jugo de naranja hasta cubrir la carne. Cocina a fuego lento 2 horas.\n3. Retira la carne y desmenuza con tenedores. Dora en su propia grasa 5 minutos.\n4. Calienta las tortillas en un comal. Sirve con salsa verde (chiles, cilantro y limón).'
  },
  {
    id: '6',
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
    recipe: '1. Hierve el pollo con cebolla, apio, zanahorias, ajo y laurel durante 1h30m.\n2. Retira el pollo y desmenuza la carne. Cuela el caldo.\n3. Regresa el caldo a la olla, agrega zanahoria y apio picados. Cocina 10 minutos.\n4. Añade los fideos y cocina 3-4 minutos. Incorpora el pollo desmenuzado.\n5. Rectifica sazón con sal y pimienta blanca.'
  },
  {
    id: '7',
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
    recipe: '1. Separa las yemas de las claras. Bate las yemas con azúcar hasta obtener una crema.\n2. Incorpora el mascarpone en la mezcla de yemas.\n3. Bate las claras a punto de nieve e intégralas con movimientos envolventes.\n4. Empapa los bizcochos en café y forma una capa en un molde.\n5. Alterna capas de crema y bizcochos. Refrigera 4 horas. Espolvorea cacao antes de servir.'
  },
  {
    id: '8',
    name: 'Panqueques con Miel y Frutas',
    description: 'Panqueques esponjosos con frutas frescas y miel de agave.',
    image: 'https://www.pronacatqma.com/images/com_yoorecipe/banner_superior/16887_1.jpg',
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
    recipe: '1. Mezcla harina, polvo para hornear y una pizca de sal.\n2. En otro tazón, machaca el plátano con leche de almendras y aceite de coco.\n3. Combina ambas mezclas y deja reposar 10 minutos.\n4. Cocina en sartén antiadherente a fuego medio-bajo.\n5. Sirve con rodajas de kiwi, fresas y miel de agave.'
  }
];

// ----- Contexto Global (Autenticación, recetas, favoritos, planificador, comentarios) -----
const AppContext = React.createContext();

// ----- Pantallas de Autenticación (presentadas de forma modal) -----
function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AppContext);

  return (
    <View style={styles.authContainer}>
      <Text style={styles.authTitle}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#7D4C00"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#7D4C00"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={() => signIn(username, password)}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useContext(AppContext);

  return (
    <View style={styles.authContainer}>
      <Text style={styles.authTitle}>Registrarse</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#7D4C00"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#7D4C00"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#7D4C00"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={() => signUp(username, email, password)}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

// ----- Pantalla de Perfil (se mostrará en modal) -----
function ProfileScreen({ onClose }) {
  const { user, signOut } = useContext(AppContext);
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.profileTitle}>Perfil</Text>
        <Text style={styles.profileText}>Usuario: {user.username}</Text>
        <Text style={styles.profileText}>Email: {user.email}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onClose();
            signOut();
          }}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ----- Pantallas de la App Principal -----
function HomeScreen({ navigation }) {
  const { recipes, openProfileModal } = useContext(AppContext);
  const [filter, setFilter] = useState('');
  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Agrega un botón en la cabecera para abrir el modal del perfil
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={openProfileModal} style={{ marginRight: 10 }}>
          <Text style={styles.headerButton}>Perfil</Text>
        </TouchableOpacity>
      ),
      headerStyle: { backgroundColor: '#F57C00' },
      headerTintColor: '#fff',
    });
  }, [navigation, openProfileModal]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🍴 Delicias Express</Text>
      <TextInput
        style={[styles.input, { marginBottom: 15 }]}
        placeholder="Filtrar recetas..."
        placeholderTextColor="#7D4C00"
        value={filter}
        onChangeText={setFilter}
      />
      <View style={styles.foodGrid}>
        {filteredRecipes.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.foodCard}
            onPress={() => navigation.navigate('Recipe', { item })}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

function RecipeScreen({ route, navigation }) {
  const { item } = route.params;
  const { favorites, addFavorite, removeFavorite, planner, addToPlanner, removeFromPlanner } = useContext(AppContext);
  const isFavorite = favorites.find(fav => fav.id === item.id);
  const inPlanner = planner.find(plan => plan.id === item.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(item);
    } else {
      addFavorite(item);
    }
  };

  const handleTogglePlanner = () => {
    if (inPlanner) {
      removeFromPlanner(item);
    } else {
      addToPlanner(item);
    }
  };

  return (
    <ScrollView style={styles.recipeContainer}>
      <Image
        source={{ uri: item.image }}
        style={styles.featuredImage}
        resizeMode="contain"
      />
      <View style={styles.recipeContent}>
        <Text style={styles.recipeTitle}>{item.name}</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredientes:</Text>
          <View style={styles.ingredientList}>
            {item.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Text>•</Text>
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preparación:</Text>
          <View style={styles.stepContainer}>
            {item.recipe.split('\n').map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={styles.stepCircle}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step.replace(/^\d+\.\s*/, '')}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.smallButton} onPress={handleToggleFavorite}>
            <Text style={styles.buttonText}>{isFavorite ? 'Quitar Favorito' : 'Agregar Favorito'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButton} onPress={handleTogglePlanner}>
            <Text style={styles.buttonText}>{inPlanner ? 'Quitar del Plan' : 'Agregar al Plan'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButton} onPress={() => navigation.navigate('Comments', { recipeId: item.id, recipeName: item.name })}>
            <Text style={styles.buttonText}>Comentarios</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

function CommentsScreen({ route }) {
  const { recipeId, recipeName } = route.params;
  const { comments, addComment, user } = useContext(AppContext);
  const [newComment, setNewComment] = useState('');
  const recipeComments = comments[recipeId] || [];

  const handleAddComment = () => {
    if (newComment.trim() === '') {
      Alert.alert('Error', 'Ingresa un comentario');
      return;
    }
    addComment(recipeId, { username: user.username, text: newComment });
    setNewComment('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comentarios para {recipeName}</Text>
      <ScrollView style={{ maxHeight: 300 }}>
        {recipeComments.map((comm, index) => (
          <View key={index} style={styles.commentItem}>
            <Text style={styles.commentUser}>{comm.username}:</Text>
            <Text style={styles.commentText}>{comm.text}</Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu comentario"
        placeholderTextColor="#7D4C00"
        value={newComment}
        onChangeText={setNewComment}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddComment}>
        <Text style={styles.buttonText}>Agregar Comentario</Text>
      </TouchableOpacity>
    </View>
  );
}

function FavoritesScreen({ navigation }) {
  const { favorites } = useContext(AppContext);
  return (
    <ScrollView style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={{ textAlign: 'center', color: '#7D4C00' }}>
          No tienes recetas favoritas.
        </Text>
      ) : (
        <View style={styles.foodGrid}>
          {favorites.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.foodCard}
              onPress={() => navigation.navigate('Recipe', { item })}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}


function PlannerScreen() {
  const { planner } = useContext(AppContext);
  const aggregatedIngredients = {};
  planner.forEach(recipe => {
    recipe.ingredients.forEach(ing => {
      aggregatedIngredients[ing] = (aggregatedIngredients[ing] || 0) + 1;
    });
  });
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Planificador</Text>
      <Text style={styles.sectionTitle}>Recetas Planificadas:</Text>
      {planner.length === 0 ? (
        <Text style={{ textAlign: 'center', color: '#7D4C00' }}>No has agregado recetas al plan.</Text>
      ) : (
        planner.map(item => (
          <View key={item.id} style={styles.plannerItem}>
            <Text style={styles.cardTitle}>{item.name}</Text>
          </View>
        ))
      )}
      <Text style={styles.sectionTitle}>Lista de Compras:</Text>
      {Object.keys(aggregatedIngredients).length === 0 ? (
        <Text style={{ textAlign: 'center', color: '#7D4C00' }}>No hay ingredientes.</Text>
      ) : (
        Object.entries(aggregatedIngredients).map(([ingredient, count]) => (
          <Text key={ingredient} style={styles.ingredientText}>
            • {ingredient} {count > 1 ? `x${count}` : ''}
          </Text>
        ))
      )}
    </ScrollView>
  );
}

function CreateRecipeScreen({ navigation }) {
  const { addRecipe, recipes } = useContext(AppContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');
  const [recipeText, setRecipeText] = useState('');

  const handleCreateRecipe = () => {
    if (!name || !description || !image || !ingredientsText || !recipeText) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
    const newRecipe = {
      id: (recipes.length + 1).toString(),
      name,
      description,
      image,
      ingredients: ingredientsText.split(',').map(i => i.trim()),
      recipe: recipeText,
    };
    addRecipe(newRecipe);
    Alert.alert('Éxito', 'Receta creada');
    navigation.navigate('Inicio');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Crear Receta</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la receta"
        placeholderTextColor="#7D4C00"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción breve"
        placeholderTextColor="#7D4C00"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="URL de la imagen"
        placeholderTextColor="#7D4C00"
        value={image}
        onChangeText={setImage}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingredientes (separados por coma)"
        placeholderTextColor="#7D4C00"
        value={ingredientsText}
        onChangeText={setIngredientsText}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Preparación / Receta"
        placeholderTextColor="#7D4C00"
        value={recipeText}
        onChangeText={setRecipeText}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateRecipe}>
        <Text style={styles.buttonText}>Crear Receta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ----- Navegadores -----
// Stack de la pantalla principal (Inicio, Recipe, Comments)
const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Inicio"
        component={HomeScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <HomeStack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={({ route }) => ({ title: route.params.item.name, headerTitleAlign: 'center' })}
      />
      <HomeStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ route }) => ({ title: `Comentarios: ${route.params.recipeName}`, headerTitleAlign: 'center' })}
      />
    </HomeStack.Navigator>
  );
}

const FavoritesStack = createStackNavigator();

function FavoritesStackScreen() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen
        name="FavoritesMain"
        component={FavoritesScreen}
        options={{
          headerShown: false,
        }}
      />
      <FavoritesStack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={({ route }) => ({
          title: route.params.item.name,
          headerTitleAlign: 'center',
        })}
      />
    </FavoritesStack.Navigator>
  );
}


// Stack de autenticación (Login, Register) con presentación modal
const AuthStack = createStackNavigator();
function AuthStackScreen() {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        presentation: 'modal',
        headerStyle: { backgroundColor: '#F57C00' },
        headerTintColor: '#fff',
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
}

// Tab Navigator con las opciones principales (se elimina el tab de Perfil para usar modal)
const Tab = createBottomTabNavigator();
function MainTabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="InicioTab"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (<Text style={{ color, fontSize: size }}>🏠</Text>),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritesStackScreen}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size }) => (<Text style={{ color, fontSize: size }}>❤️</Text>),
        }}
      />
      <Tab.Screen
        name="Planificador"
        component={PlannerScreen}
        options={{
          tabBarLabel: 'Planificador',
          tabBarIcon: ({ color, size }) => (<Text style={{ color, fontSize: size }}>📅</Text>),
        }}
      />
      <Tab.Screen
        name="CrearReceta"
        component={CreateRecipeScreen}
        options={{
          tabBarLabel: 'Crear',
          tabBarIcon: ({ color, size }) => (<Text style={{ color, fontSize: size }}>✍️</Text>),
        }}
      />
    </Tab.Navigator>
  );
}

// ----- Componente Principal -----
export default function App() {
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [recipes, setRecipes] = useState(initialRecipes);
  const [favorites, setFavorites] = useState([]);
  const [planner, setPlanner] = useState([]);
  const [comments, setComments] = useState({});
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  // Funciones de autenticación
  const signIn = (username, password) => {
    const found = registeredUsers.find(u => u.username === username && u.password === password);
    if (found) {
      setUser({ username, email: found.email });
    } else {
      Alert.alert('Error', 'Credenciales inválidas');
    }
  };

  // Ahora se recibe también el email para el registro
  const signUp = (username, email, password) => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    const exists = registeredUsers.find(u => u.username === username);
    if (exists) {
      Alert.alert('Error', 'El usuario ya existe');
      return;
    }
    const newUser = { username, email, password };
    setRegisteredUsers([...registeredUsers, newUser]);
    setUser({ username, email });
  };

  const signOut = () => {
    setUser(null);
  };

  // Funciones para favoritos
  const addFavorite = (recipe) => setFavorites([...favorites, recipe]);
  const removeFavorite = (recipe) => setFavorites(favorites.filter(fav => fav.id !== recipe.id));

  // Funciones para el planificador
  const addToPlanner = (recipe) => setPlanner([...planner, recipe]);
  const removeFromPlanner = (recipe) => setPlanner(planner.filter(plan => plan.id !== recipe.id));

  // Función para comentarios
  const addComment = (recipeId, comment) => {
    setComments({
      ...comments,
      [recipeId]: comments[recipeId] ? [...comments[recipeId], comment] : [comment],
    });
  };

  // Función para crear una nueva receta
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
  };

  return (
    <AppContext.Provider value={appContextValue}>
      <NavigationContainer>
        {user ? <MainTabScreen /> : <AuthStackScreen />}
        {user && (
          <Modal
            visible={profileModalVisible}
            animationType="slide"
            transparent
            onRequestClose={closeProfileModal}
          >
            <ProfileScreen onClose={closeProfileModal} />
          </Modal>
        )}
      </NavigationContainer>
    </AppContext.Provider>
  );
}

// ----- Estilos con paleta cálida -----
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E0',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#F57C00',
  },
  foodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  foodCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#7D4C00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#4E342E',
  },
  cardDescription: {
    fontSize: 12,
    color: '#7D4C00',
  },
  recipeContainer: {
    flex: 1,
    backgroundColor: '#FFF3E0',
  },
  featuredImage: {
    width: '100%',
    height: 300,
  },
  recipeContent: {
    padding: 20,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 20,
    textAlign: 'center'
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4E342E',
    marginBottom: 10,
  },
  ingredientList: {
    marginLeft: 15,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  ingredientText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4E342E',
  },
  stepContainer: {
    marginLeft: 20,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F57C00',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  stepNumber: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#4E342E',
    lineHeight: 20,
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF3E0',
  },
  authTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#F57C00',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#F57C00',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    color: '#4E342E',
  },
  button: {
    backgroundColor: '#F57C00',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  smallButton: {
    backgroundColor: '#F57C00',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText: {
    color: '#F57C00',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  headerButton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#7D4C00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  profileTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#F57C00',
  },
  profileText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#4E342E',
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: '#F57C00',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  commentItem: {
    padding: 10,
    borderBottomColor: '#F57C00',
    borderBottomWidth: 1,
  },
  commentUser: {
    fontWeight: 'bold',
    color: '#4E342E',
  },
  commentText: {
    marginLeft: 5,
    color: '#4E342E',
  },
  plannerItem: {
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 8,
  },
});
