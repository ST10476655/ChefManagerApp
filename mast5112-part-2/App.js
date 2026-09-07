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

export default function App() {
  // Used to switch between screens
  const [currentScreen, setCurrentScreen] = useState("home");

  // Stores form values
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");

  // Stores menu items
  const [menuItems, setMenuItems] = useState([]);

  // Shows or hides course options
  const [showDropdown, setShowDropdown] = useState(false);

  // Save menu item
  const saveItem = () => {
    if (
      dishName.trim() === "" ||
      description.trim() === "" ||
      course.trim() === "" ||
      price.trim() === ""
    ) {
      Alert.alert("Error", "Please complete all fields.");
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      dishName,
      description,
      course,
      price,
    };

    // Adds item and updates menu automatically
    setMenuItems([...menuItems, newItem]);

    Alert.alert("Success", "Menu item saved successfully.");

    // Clear form after saving
    setDishName("");
    setDescription("");
    setCourse("");
    setPrice("");
  };

  // Clear form
  const clearForm = () => {
    setDishName("");
    setDescription("");
    setCourse("");
    setPrice("");
  };

  // HOME SCREEN
  if (currentScreen === "home") {
    return (
      <View style={styles.container}>
        <Text style={styles.appTitle}>
          Restaurant Menu Manager
        </Text>

        <Text style={styles.welcome}>
          Welcome Chef Christoffel
        </Text>

        <TouchableOpacity
          style={styles.yellowButton}
          onPress={() => setCurrentScreen("add")}
        >
          <Text style={styles.buttonText}>
            Add Menu Item
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.yellowButton}
          onPress={() => setCurrentScreen("view")}
        >
          <Text style={styles.buttonText}>
            View Menu Items
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.redButton}
          onPress={() =>
            Alert.alert(
              "Exit",
              "Close Snack to exit the application."
            )
          }
        >
          <Text style={styles.buttonText}>Exit</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ADD MENU SCREEN
  if (currentScreen === "add") {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.screenTitle}>
          Add Menu Item
        </Text>

        <Text style={styles.label}>Dish Name</Text>
        <TextInput
          style={styles.input}
          value={dishName}
          onChangeText={setDishName}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Course</Text>

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

        <Text style={styles.label}>Price</Text>

        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={styles.greenButton}
          onPress={saveItem}
        >
          <Text style={styles.buttonText}>
            Save Item
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.redButton}
          onPress={clearForm}
        >
          <Text style={styles.buttonText}>
            Clear Form
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.redButton}
          onPress={() => setCurrentScreen("home")}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // VIEW MENU SCREEN
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>
        Menu Items
      </Text>

      <ScrollView style={styles.menuBox}>
        {menuItems.length === 0 ? (
          <Text style={styles.emptyText}>
            No menu items added yet.
          </Text>
        ) : (
          menuItems.map((item) => (
            <View key={item.id}>
              <Text style={styles.courseTitle}>
                {item.course}
              </Text>

              <Text style={styles.menuItem}>
                • {item.dishName} - R{item.price}
              </Text>

              <Text style={styles.description}>
                {item.description}
              </Text>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.redButton}
        onPress={() => setCurrentScreen("home")}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#99999F",
    padding: 20,
  },

  appTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    textAlign: "center",
    marginTop: 50,
  },

  welcome: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
    marginTop: 90,
    marginBottom: 50,
  },

  screenTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    textAlign: "center",
    marginVertical: 30,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#FFC800",
    borderRadius: 10,
    height: 60,
    justifyContent: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
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
    alignItems: "center",
    marginBottom: 8,
  },

  yellowButton: {
    backgroundColor: "#FFC800",
    padding: 18,
    borderRadius: 40,
    alignItems: "center",
    marginHorizontal: 25,
    marginBottom: 25,
  },

  greenButton: {
    backgroundColor: "#39C85A",
    padding: 18,
    borderRadius: 40,
    alignItems: "center",
    marginHorizontal: 25,
    marginTop: 20,
  },

  redButton: {
    backgroundColor: "#FF3737",
    padding: 18,
    borderRadius: 40,
    alignItems: "center",
    marginHorizontal: 25,
    marginTop: 15,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },

  menuBox: {
    backgroundColor: "#DDDDDD",
    padding: 15,
    minHeight: 400,
    marginBottom: 20,
  },

  courseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
  },

  menuItem: {
    fontSize: 18,
    marginLeft: 10,
  },

  description: {
    fontSize: 14,
    marginLeft: 20,
    marginBottom: 10,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});