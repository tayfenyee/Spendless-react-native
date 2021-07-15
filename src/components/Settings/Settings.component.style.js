import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header: {
        marginHorizontal: 15,
    },
    headerText: {
        color: 'white',
        fontSize: 17,
        marginBottom: 5,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    optionHeader: {
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 0.2,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    optionSubheader1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    optionSubheader2: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    optionConfig: {
        paddingTop: 15,
        paddingLeft: 35,
    },
    configTitle: {
        color: 'grey',
        marginBottom: 5,
    },
    configText: {
        textAlignVertical: 'top',
        color: 'grey',
    },
    icon: {
        fontSize: 20,
        marginRight: 15,
    },
    modalContainer: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
        position: 'absolute',
        elevation: 3,
        top: 230,
        width: 380,
        height: 270,
        borderRadius: 20,
    },
    modalTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#A9A9A9',
        borderBottomWidth: 0.5,
        paddingBottom: 8,
        paddingTop: 10,
        marginBottom: 8,
        marginHorizontal: 20,
    },
    modalTitleText: {
        fontSize: 17,
        fontWeight: '200',
        color: '#686868',
        marginRight: 5,
    },
    modalSubheader: {
        flexDirection: 'row',
        paddingVertical: 10,
        marginHorizontal: 20,
    },
    modalSubheaderText: {
        width: 60,
        textAlign: 'right',
        fontSize: 14,
        color: '#686868',
        marginRight: 10,
    },
    addAccountText: {
        width: 250,
        color: 'grey',
        marginLeft: 15,
        textAlignVertical: 'top',
    },
    optionChildSelection: {
        height: 100,
        width: 225,
        borderWidth: 0,
        marginTop: 15,
        elevation: 1,
    },
    optionChildText: {
        fontSize: 14,
        color: '#A9A9A9',
        marginHorizontal: 15,
    },
    optionChildIcon: {
        fontSize: 18,
    },
    dropdownContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    dropdownText: {
        marginLeft: 20,
        fontSize: 14,
        color: 'grey',
    },
    dropdownIcon: {
        fontSize: 18,
    },
    saveButton: {
        height: 45,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E2F0CB',
    },
    saveText: {
        color: 'white',
        fontSize: 15,
        letterSpacing: 3,
    },
});

export default styles;