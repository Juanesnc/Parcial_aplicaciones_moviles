// src/styles/styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
    padding: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#0D1B2A',
  },
  vehicleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  vehicleCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#0D1B2A',
  },
  cardDetail: {
    fontSize: 14,
    color: '#3E4C59',
  },
  vehicleDetailsContainer: {
    flex: 1,
    backgroundColor: '#F5F6F7',
  },
  featuredImage: {
    width: '100%',
    height: 250,
  },
  detailsContent: {
    padding: 20,
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0D1B2A',
    marginBottom: 15,
    textAlign: 'center'
  },
  detailsText: {
    fontSize: 16,
    color: '#3E4C59',
    marginBottom: 10,
  },
  featureSection: {
    marginVertical: 10,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D1B2A',
    marginBottom: 10,
  },
  featureList: {
    marginLeft: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#3E4C59',
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F6F7',
  },
  authTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0D1B2A',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#0D1B2A',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    color: '#3E4C59',
  },
  button: {
    backgroundColor: '#0D1B2A',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText: {
    color: '#0D1B2A',
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
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  profileTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0D1B2A',
  },
  profileText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#3E4C59',
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: '#0D1B2A',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  buttonComentarios: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonComentariosText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  commentItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  commentUser: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D1B2A',
  },
  commentText: {
    fontSize: 14,
    color: '#3E4C59',
    marginTop: 5,
  },
  commentTimestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  commentRating: {
    fontSize: 16,
    color: '#f1c40f',
    marginBottom: 4
  },
  ratingStars: {
    color: '#f1c40f',
    fontSize: 16
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 12
  },
  mapContainer: {
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20
  },
});
