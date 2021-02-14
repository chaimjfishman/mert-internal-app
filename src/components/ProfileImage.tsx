import React from 'react';
import {  View, ActivityIndicator, Image,  } from 'react-native';
import * as db from '../utils/db';

export default class ProfileImage extends React.Component {

    constructor(props: any) {
        super(props);
        this.state =
            {
                loading: true,
                mounted: true,
                image: "/images/logoblue.jpg",
                url: "",
            }
    }

    componentDidMount() {
        this.setState({ isMounted: true })
        this.getAndLoadHttpUrl()
    }

    async getAndLoadHttpUrl() {
        const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006_edit_1.jpg'

        if (this.state.mounted == true) {
            const imageUrl = await db.getStorageImage(this.props.image, defaultImage)
            this.setState({url: imageUrl})
            this.setState({ loading: false })
        }
    }

    componentWillUnmount() {
        this.setState({ isMounted: false })
    }

    componentWillReceiveProps(props: any) {
        this.props = props
    }

    render() {
        if (this.state.mounted == true) {
            if (this.state.loading == true) {
                return (
                    <View key={this.props.image} style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }} >
                        <ActivityIndicator />
                    </View>
                )
            }
            return (
                <Image style={this.props.style} source={{uri: this.state.url}} />
            )
        }
        return null
    }
}