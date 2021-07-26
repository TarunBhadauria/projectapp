import React, { Component } from 'react';
import { AsyncStorage, Dimensions, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Divider } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons'
const { width, height } = Dimensions.get('screen')
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            data: [],
            recordLength: 20,
            record: []

        }
    }
    Logout = async () => {
        AsyncStorage.removeItem('loggedinuser')
        this.props.navigation.reset({
            index: 0, routes: [{
                name: 'Login'
            }
            ]
        })
    }
    onScrollHandler = () => {
        var recordLength = this.state.recordLength + 10
        this.setState({
            recordLength
        }, () => {
            this.setState({ record: this.state.data.slice(0, recordLength) })
        });
    }
    async componentWillMount() {
        this.setState({ user: this.props.route.params.data })
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => this.setState({ data: json, record: json.slice(0, this.state.recordLength) }))


    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#2d3436', justifyContent: 'space-between' }}>

                    <View style={{ alignItems:'center', margin: '5%' }}>
                        <Text style={{ fontSize: 15, color: 'white' }}>{this.state.user.name}</Text>
                        <Text style={{ fontSize: 15, color: 'white' }}>{this.state.user.email}</Text>

                    </View>
                    <Ionicons name='log-out-outline' size={35} style={{ color: 'white',textAlignVertical:'center',margin:'5%' }} onPress={()=>{this.Logout()}} />
                </View>
                <FlatList
                    data={this.state.record}
                    renderItem={({ item, index }) => (
                        <View>
                            <Text style={{ paddingVertical: 10 ,textAlign:'center'}}>{item.title}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <Divider style={{ marginTop: 5, width:width}} parentStyle={{ backgroundColor: 'white', alignItems: 'baseline' }} />}
                    onEndReached={this.onScrollHandler}
                    onEndThreshold={0}
                />

            </View>
        )
    }
}
export default Profile;