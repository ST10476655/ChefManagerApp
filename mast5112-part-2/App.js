import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

// Main Application Component
export default function App() {

  // Controls which screen is displayed
  const [currentScreen, setCurrentScreen] = useState("home");

  // Form input fields
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");

  // Stores all menu items
  const [menuItems, setMenuItems] = useState([]);

  // Controls course dropdown visibility
  const [showDropdown, setShowDropdown] = useState(false);

  // Search functionality
  const [searchText, setSearchText] = useState("");

  // Filter functionality
  const [filterCourse, setFilterCourse] = useState("All");

  // Stores ID of item currently being edited
  const [editId, setEditId] = useState(null);

  // Clears all form fields
  const clearForm = () => {
    setDishName("");
    setDescription("");
    setCourse("");
    setPrice("");
  };

  // Add new menu item or update existing item
  const saveItem = () => {

    // Validation
    if (
      dishName.trim() === "" ||
      description.trim() === "" ||
      course.trim() === "" ||
      price.trim() === ""
    ) {
      Alert.alert(
        "Error",
        "Please complete all fields."
      );
      return;
    }

    // Ensure price contains numbers only
    if (isNaN(price)) {
      Alert.alert(
        "Error",
        "Price must be a valid number."
      );
      return;
    }

    // Update item if editing
    if (editId) {

      const updatedMenu = menuItems.map(
        (item) =>
          item.id === editId
            ? {
                ...item,
                dishName,
                description,
                course,
                price,
              }
            : item
      );

      setMenuItems(updatedMenu);

      Alert.alert(
        "Updated",
        "Menu item updated successfully."
      );

      setEditId(null);

    } else {

      // Create new menu item
      const newItem = {
        id: Date.now().toString(),
        dishName,
        description,
        course,
        price,
      };

      // Add item to menu list
      setMenuItems([
        ...menuItems,
        newItem,
      ]);

      Alert.alert(
        "Success",
        "Menu item added successfully."
      );
    }

    // Clear form after save
    clearForm();
  };

  // Load selected item into form for editing
  const editItem = (item) => {

    setDishName(item.dishName);
    setDescription(item.description);
    setCourse(item.course);
    setPrice(item.price);

    setEditId(item.id);

    // Open Add/Edit screen
    setCurrentScreen("add");
  };

  // Remove selected menu item
  const deleteItem = (id) => {

    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this menu item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {

            setMenuItems(
              menuItems.filter(
                (item) => item.id !== id
              )
            );

            Alert.alert(
              "Success",
              "Menu item deleted."
            );
          },
        },
      ]
    );
  };
  // =========================
  // MENU STATISTICS
  // =========================

  // Total number of menu items
  const totalItems = menuItems.length;

  // Average price calculation
  const averagePrice =
    totalItems > 0
      ? (
          menuItems.reduce(
            (sum, item) =>
              sum + Number(item.price),
            0
          ) / totalItems
        ).toFixed(2)
      : "0.00";

  // Count starter items
  const starterCount = menuItems.filter(
    (item) =>
      item.course === "Starter"
  ).length;

  // Count main course items
  const mainCourseCount =
    menuItems.filter(
      (item) =>
        item.course === "Main Course"
    ).length;

  // Count dessert items
  const dessertCount = menuItems.filter(
    (item) =>
      item.course === "Dessert"
  ).length;

  // =========================
  // HOME SCREEN
  // =========================

  if (currentScreen === "home") {
    return (
      <View style={styles.container}>

        <Text style={styles.appTitle}>
          Restaurant Menu Manager
        </Text>

        <Text style={styles.welcome}>
          Welcome Chef Christoffel
        </Text>

        {/* Navigate to Add Menu Screen */}
        <TouchableOpacity
          style={styles.yellowButton}
          onPress={() =>
            setCurrentScreen("add")
          }
        >
          <Text style={styles.buttonText}>
            Add Menu Item
          </Text>
        </TouchableOpacity>

        {/* Navigate to View Menu Screen */}
        <TouchableOpacity
          style={styles.yellowButton}
          onPress={() =>
            setCurrentScreen("view")
          }
        >
          <Text style={styles.buttonText}>
            View Menu Items
          </Text>
        </TouchableOpacity>

        {/* Navigate to Statistics Screen */}
        <TouchableOpacity
          style={styles.greenButton}
          onPress={() =>
            setCurrentScreen("stats")
          }
        >
          <Text style={styles.buttonText}>
            Menu Statistics
          </Text>
        </TouchableOpacity>

        {/* Exit Message */}
        <TouchableOpacity
          style={styles.redButton}
          onPress={() =>
            Alert.alert(
              "Exit",
              "Close Snack to exit the application."
            )
          }
        >
          <Text style={styles.buttonText}>
            Exit
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
    // =========================
  // ADD / EDIT MENU SCREEN
  // =========================

  if (currentScreen === "add") {
    return (
      <ScrollView style={styles.container}>
        
        <Text style={styles.screenTitle}>
          {editId ? "Edit Menu Item" : "Add Menu Item"}
        </Text>

        {/* Dish Name */}
        <Text style={styles.label}>
          Dish Name
        </Text>

        <TextInput
          style={styles.input}
          value={dishName}
          onChangeText={setDishName}
          placeholder="Enter dish name"
        />

        {/* Description */}
        <Text style={styles.label}>
          Description
        </Text>

        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
        />

        {/* Course Dropdown */}
        <Text style={styles.label}>
          Course
        </Text>

        <TouchableOpacity
          style={styles.input}
          onPress={() =>
            setShowDropdown(!showDropdown)
          }
        >
          <Text style={styles.dropdownText}>
            {course === ""
              ? "Select Course ▼"
              : course}
          </Text>
        </TouchableOpacity>

        {/* Dropdown Menu */}
        {showDropdown && (
          <View>

            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => {
                setCourse("Starter");
                setShowDropdown(false);
              }}
            >
              <Text style={styles.buttonText}>
                Starter
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => {
                setCourse("Main Course");
                setShowDropdown(false);
              }}
            >
              <Text style={styles.buttonText}>
                Main Course
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => {
                setCourse("Dessert");
                setShowDropdown(false);
              }}
            >
              <Text style={styles.buttonText}>
                Dessert
              </Text>
            </TouchableOpacity>

          </View>
        )}

        {/* Price */}
        <Text style={styles.label}>
          Price
        </Text>

        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          placeholder="Enter price"
        />

        {/* Save or Update Button */}
        <TouchableOpacity
          style={styles.greenButton}
          onPress={saveItem}
        >
          <Text style={styles.buttonText}>
            {editId
              ? "Update Item"
              : "Save Item"}
          </Text>
        </TouchableOpacity>

        {/* Clear Form */}
        <TouchableOpacity
          style={styles.redButton}
          onPress={clearForm}
        >
          <Text style={styles.buttonText}>
            Clear Form
          </Text>
        </TouchableOpacity>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.redButton}
          onPress={() => {
            clearForm();
            setEditId(null);
            setCurrentScreen("home");
          }}
        >
          <Text style={styles.buttonText}>
            Back
          </Text>
        </TouchableOpacity>

      </ScrollView>
    );
  }
  // =========================
  // STATISTICS SCREEN
  // =========================

  if (currentScreen === "stats") {
    return (
      <View style={styles.container}>

        <Text style={styles.screenTitle}>
          Menu Statistics
        </Text>

        {/* Total Menu Items */}
        <Text style={styles.statText}>
          Total Menu Items: {totalItems}
        </Text>

        {/* Average Price */}
        <Text style={styles.statText}>
          Average Price: R{averagePrice}
        </Text>

        {/* Starter Count */}
        <Text style={styles.statText}>
          Starters: {starterCount}
        </Text>

        {/* Main Course Count */}
        <Text style={styles.statText}>
          Main Courses: {mainCourseCount}
        </Text>

        {/* Dessert Count */}
        <Text style={styles.statText}>
          Desserts: {dessertCount}
        </Text>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.redButton}
          onPress={() =>
            setCurrentScreen("home")
          }
        >
          <Text style={styles.buttonText}>
            Back
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
    // =========================
  // VIEW MENU SCREEN
  // =========================

  return (
    <View style={styles.container}>
      
      <Text style={styles.screenTitle}>
        Menu Items
      </Text>

      {/* Search Box */}
      <TextInput
        style={styles.input}
        placeholder="Search dish name..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Filter Buttons */}

      <TouchableOpacity
        style={styles.yellowButton}
        onPress={() => setFilterCourse("Starter")}
      >
        <Text style={styles.buttonText}>
          Starters
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.yellowButton}
        onPress={() =>
          setFilterCourse("Main Course")
        }
      >
        <Text style={styles.buttonText}>
          Main Courses
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.yellowButton}
        onPress={() => setFilterCourse("Dessert")}
      >
        <Text style={styles.buttonText}>
          Desserts
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.greenButton}
        onPress={() => setFilterCourse("All")}
      >
        <Text style={styles.buttonText}>
          Show All
        </Text>
      </TouchableOpacity>

      {/* Menu List */}

      <ScrollView style={styles.menuBox}>
        {menuItems
          .filter((item) =>
            item.dishName
              .toLowerCase()
              .includes(
                searchText.toLowerCase()
              )
          )
          .filter(
            (item) =>
              filterCourse === "All" ||
              item.course === filterCourse
          )
          .map((item) => (
            <View
              key={item.id}
              style={styles.itemCard}
            >
              <Text style={styles.courseTitle}>
                {item.course}
              </Text>

              <Text style={styles.menuItem}>
                {item.dishName}
              </Text>

              <Text style={styles.description}>
                {item.description}
              </Text>

              <Text style={styles.price}>
                Price: R{item.price}
              </Text>

              {/* Edit Button */}

              <TouchableOpacity
                style={styles.greenButton}
                onPress={() =>
                  editItem(item)
                }
              >
                <Text style={styles.buttonText}>
                  Edit Item
                </Text>
              </TouchableOpacity>

              {/* Delete Button */}

              <TouchableOpacity
                style={styles.redButton}
                onPress={() =>
                  deleteItem(item.id)
                }
              >
                <Text style={styles.buttonText}>
                  Delete Item
                </Text>
              </TouchableOpacity>
            </View>
          ))}

        {menuItems.length === 0 && (
          <Text style={styles.emptyText}>
            No menu items available.
          </Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.redButton}
        onPress={() =>
          setCurrentScreen("home")
        }
      >
        <Text style={styles.buttonText}>
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// =========================
// STYLESHEET
// =========================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#99999F",
    padding: 20,
  },

  appTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  },

  welcome: {
    color: "#FFFFFF",
    fontSize: 22,
    textAlign: "center",
    marginTop: 70,
    marginBottom: 50,
  },

  screenTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 25,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#FFC800",
    borderRadius: 10,
    height: 55,
    paddingHorizontal: 15,
    marginBottom: 15,
    justifyContent: "center",
  },

  dropdownText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
  },

  dropdownOption: {
    backgroundColor: "#FFC800",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  yellowButton: {
    backgroundColor: "#FFC800",
    borderRadius: 30,
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
  },

  greenButton: {
    backgroundColor: "#39C85A",
    borderRadius: 30,
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
  },

  redButton: {
    backgroundColor: "#FF3737",
    borderRadius: 30,
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  menuBox: {
    backgroundColor: "#DDDDDD",
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    marginBottom: 15,
  },

  itemCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  courseTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  menuItem: {
    fontSize: 18,
    marginTop: 5,
  },

    description: {
    fontSize: 15,
    marginTop: 5,
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 10,
  },

  statText: {
    color: "#FFFFFF",
    fontSize: 22,
    textAlign: "center",
    marginVertical: 10,
  },

  emptyText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
});