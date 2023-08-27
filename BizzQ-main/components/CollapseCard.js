import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const CollapseCard = ({ title, buttonComponent, children }) => {
  const [collapsed, setCollapsed] = useState(true);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <View style={styles.card}>
      {React.cloneElement(buttonComponent, { onPress: handleToggle })}
      {!collapsed && (
        <View style={styles.content} className="p-6">
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    flex: 1,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrow: {
    color: 'white',
    fontSize: 18,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 16,
  },
});

export default CollapseCard;