import { useEffect, useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    Alert, 
    TouchableOpacity, 
    ImageBackground, 
    SafeAreaView
} from "react-native"
import { GeneralStyles } from "../styles/GeneralStyles";

const imgBackgrd = {uri: 'https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80'}

export const RecoverPassView = () => {

    const [email, setEmail] = useState("");

    const [isBtnPress, setIsBrnPress] = useState(false);
    const [cooldownBtn, setCooldownBtn] = useState(45);

    const handlerBtnPress = () => {
        handlerResetPassword();
        
        if (!isBtnPress){
            setIsBrnPress(true);
            setCooldownBtn(45);
        }
    }

    useEffect(() => {
        let interval = null;

        if (isBtnPress) {
            interval = setInterval(() => {
                setCooldownBtn((prewTime) => prewTime - 1);
            }, 1000)
        }

        if (cooldownBtn === 0) {
            setIsBrnPress(false);
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        }
    }, [isBtnPress, cooldownBtn])

    const handlerResetPassword = () => {
        // Reset pass processing
        Alert.alert("Reset password", 
        "\nPassword was reset, \ncheck your email \nor phone message")
    }

    return(
        <ImageBackground
        source={imgBackgrd}
        style={GeneralStyles.imgBackgrd}
        >
                <View style={{flex:1}}>

                    <View style={styles.mainForm} >

                        <TextInput
                        style={styles.textInputField}
                        placeholder="enter email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType='default'
                        autoCorrect={false}
                        autoCapitalize='none'
                        />

                        <TouchableOpacity 
                        style={GeneralStyles.generalBtn} 
                        onPress={handlerBtnPress}
                        activeOpacity={3/4}
                        disabled={isBtnPress}
                        >
                            <Text style={GeneralStyles.textInGeneralBtn}>
                                {isBtnPress ? `Wait ${cooldownBtn} sec` : 'Reset password'}
                            </Text>

                        </TouchableOpacity> 

                    </View>
                    
                </View>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    mainForm: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    textInputField: {
        width: 200,
        height: 40, 
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
        margin: 3 
    },
  });