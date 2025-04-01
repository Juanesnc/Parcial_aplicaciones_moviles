// src/styles/styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
  recipeRegion: {
    fontSize: 16,
    color: '#4E342E',
    marginBottom: 10,
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
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
