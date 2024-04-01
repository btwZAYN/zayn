import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import { surahNames, surahDetails } from "./QuranData"; // Importing surahNames and surahDetails arrays

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedJuz, setSelectedJuz] = useState(null);
  const [showSurahNames, setShowSurahNames] = useState(true); // State to toggle between Surah names and Surah details

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleJuzClick = (juzNumber) => {
    setSelectedJuz(juzNumber);
  };

  const toggleDisplay = () => {
    setShowSurahNames(!showSurahNames); // Toggle between Surah names and Surah details
  };

  const filteredSurahs = showSurahNames
    ? surahNames
    : surahDetails.filter((surah) => surah.juz === selectedJuz);

  const renderItem = ({ item }) => (
    <View style={styles.surahContainer}>
      <Text style={styles.surahText}>
        {showSurahNames
          ? item.nameEnglish
          : `${item.nameEnglish} - ${item.verses} verses`}
      </Text>
    </View>
  );

  return (
    <ImageBackground
      source={require("./assets/ALEEM.png")}
      style={styles.backgroundImage}
    >
      <View style={[styles.container, isDarkMode && styles.darkMode]}>
        <View style={styles.header}>
          <Text style={styles.title}>Quran Search</Text>
          <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Search Surah"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, !showSurahNames && styles.selectedButton]}
            onPress={() => setShowSurahNames(true)}
          >
            <Text style={styles.buttonText}>Surah Names</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, showSurahNames && styles.selectedButton]}
            onPress={() => setShowSurahNames(false)}
          >
            <Text style={styles.buttonText}>Juzz</Text>
          </TouchableOpacity>
        </View>
        {!showSurahNames && (
          <View style={styles.juzContainer}>
            {[...Array(30).keys()].map((juzNumber) => (
              <TouchableOpacity
                key={juzNumber + 1}
                style={[
                  styles.juzButton,
                  selectedJuz === juzNumber + 1 && styles.selectedJuz,
                ]}
                onPress={() => handleJuzClick(juzNumber + 1)}
              >
                <Text style={styles.juzButtonText}>Juz {juzNumber + 1}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <FlatList
          data={filteredSurahs.filter(
            (surah) =>
              surah.nameEnglish
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              surah.nameArabic.includes(searchQuery)
          )}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  darkMode: {
    backgroundColor: "#333",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginRight: 5,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    fontSize: 16,
  },
  juzContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  juzButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  selectedJuz: {
    backgroundColor: "#ccc",
  },
  juzButtonText: {
    fontSize: 16,
  },
  surahContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  surahText: {
    fontSize: 18,
  },
  flatList: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default App;
