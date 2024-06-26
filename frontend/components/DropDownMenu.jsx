import { View, Text, TouchableOpacity } from "react-native";

const DropDownMenu = ({ visible, onClose, onLogout, onProfile, onSettings }) => {
  if (!visible) return null;

  const menuItems = [
    { label: "Profile", action: onProfile },
    { label: "Order" },
    { label: "Settings", action: onSettings },
    { label: "Receipts" },
    { label: "Time Track" },
    { label: "Logout", action: onLogout },
  ];

  return (
    <TouchableOpacity
      className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-90 justify-center items-center z-50"
      onPress={onClose}
    >
      <View className="w-50 rounded-lg overflow-hidden">
        <View className='items-center'>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className={`w-full p-4 ${
                index < menuItems.length - 1 ? "border-b border-gray-300" : ""
              }`}
              onPress={item.action ? item.action : onClose}
            >
              <Text className="text-center text-white text-2xl font-bold">{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DropDownMenu;
