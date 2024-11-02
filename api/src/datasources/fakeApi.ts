import { RESTDataSource } from '@apollo/datasource-rest';

export class FakeApi extends RESTDataSource {
  baseURL: string = 'https://odyssey-lift-off-rest-api.herokuapp.com/';

  getTracks() {
    return this.get('tracks');
  }

  createTrack() {
    return this.post('track')
  }

  getAuthor(authorId: string) {
    return this.get(`author/${authorId}`);
  }
}
