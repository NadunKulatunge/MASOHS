import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Root } from 'native-base';
import { Font, AppLoading } from "expo";
import Anchor from '../../components/Anchor';
import {Ionicons} from '@expo/vector-icons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default class FirstAid extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
          <AppLoading />
      );
    }

    return (
      <Container>
        <Content>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPTSURBVFhH7ZhZqFVVGICv5pCmKZZQEeLQIKHmi2QhauEsKoJllOEEGuZTD4oFkQNK6YtBiiCi+OAEjmCgog8OFUiZmUpqRoOk5oRmOTR83zru6znbuz1rH28XH+4HH+y1zt5rr732Wuv/96mqp556aoeOOAzfxkm3jh/DGBpiNxyD7+BYHIAP4z3RGKfgN/hvhp/j69gA09iB2fgr1nTtNdyKvTE33fEY2tBRnIOD0ZF4HofjJ3gOPWcXPojFLEB/O4Tv4VDsgj3xNVyGF9FzVmNLjGIIXkFvPg59RVm0QEfBmzxuRRFf4cHCYSaP4kL8Bz033cYdOEJ/4HHsZEUEm/BM4bAaO34TF4dSeUajr/wLTL+JahrhEXTknrIikp9wW+Gwmn7oqL4ZSnFMRq+ZG0o14Or0hImhFIevyGs+DqXbvI/Wu0BO4AaM4TO8ik+GUor96Kt9IJTiSEZqEb6KI7AZvoxrcSP6+x6MoQd6/oxQKqIdOlHTI1EO9zYbLNatKcHVat34UIrDQXL7KsGN04YcgTw4b93HHMk1aBtdMWEHupU0D6U4VuDlwuFtfEIbd4grxQX2beEw8Az6Vj4NpXjmoX0p2RcNP1a+EEr5cWP3ehdHwny0zo09D04zr3OrqsbIYKWbdCUkT51sT03wLH4ZSvlYiu6JJTyL3mBaKOXDOPwjFnfGjdf2TuI6zDMHbcfwWII3cTJvDqV8vIh2xldj1uPouehcjdZfwFYYw0Po6Bmn72AV/oWtQymeD9GOJCZb1XS0bIoWy1voNaNCKYXzzx/fDaV43EONQsk8dJq0R2P6PrxbspFmL57HpqGUwobcJn7DkhUUiSHSDvbCLXgDTT5iGYRebw6ZyUj0JFOgvCSr7w20jY8wFsOjc/Z3LDvF1uPfODCU4nHlfYc/o6s3z8pdgj6UobMsJo2/oGlXZysicJX6UOqN8uynxm6vMauOxohi2nMK3SPLkcRyNYuJxXlrOPS7J8+IB/qjKzGmkzPRzl3CJ6yIYAImqX5bKyrhFbSTpvR9rMjAjNoO+llZDoPCB2jnDmDFnUvoi87H65jVge/R74lyya4Zitm1D+MeaUZeK3TAr9GGV2L6o9sPrDaFw0zMeEzJbMOPqRo343vBSWznvIHfGS9hDL5So5Nh9E907v2vGC9NLIwULg6z6ixcMNvRh/I7+TmsE4y/O9Ebmx49jWkM+M5dv4/9lDTLqVN8dVPRfyHUhEGcn8vRzh/GSrP0WsMccDfaIf8G+QGNKKZdmf8S1DVuL7PQ13kajSz3JcbuRwqH9dwPVFX9B2oc7ubdQJnJAAAAAElFTkSuQmCC' }} />
              </Left>
              <Body>
                <Text>Heart Attack</Text>
                <Text note numberOfLines={1}>Persistent vice-like chest pain</Text>
              </Body>
              <Right>
                <Anchor href="https://www.mayoclinic.org/first-aid/first-aid-heart-attack/basics/art-20056679"><Ionicons name='md-globe' size={responsiveFontSize(3)}/></Anchor>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
