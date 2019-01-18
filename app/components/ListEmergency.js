import React, {
    Component
  } from 'react';
  import {Icon, Text, ListItem,Left,Body,Right,Thumbnail} from 'native-base';
  import {Ionicons} from '@expo/vector-icons';
  import Anchor from './Anchor';

  import { responsiveFontSize } from 'react-native-responsive-dimensions';
  
  
  class ListEmergency extends Component {
    render() {
      return (
        <ListItem thumbnail>
          <Left>
            <Thumbnail square source={{ uri: src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAVdSURBVHhe7Zx5qG5TGIePecyYayrzzRxJRIRIkjHJvdeUhFxDkT+Iv1AKGTNESmZCFBlConDJlK4UMo+Z55nnh12r17tr7WOvvb61z3rq6d7Oefd39trf9+211rvetacqlUqlUqmUx9L//ltJxIH4Dv6BL+C2WOmZLfBn/DPwI1wBKz1yOoYXuXEvrPTISehd6J2x0iOz8BMML/JzuDjOKNbApf75bzI2xBtxAV6KK2NKdP9P/Tei2RRfQn3C1Fmdi6WzLN6Cv6PadT+uitlYBBdi+HWW87BkLkDbppswG+ujPSF5K5aM9+H5GrOxEmryYE/qciyZJ9G26Q3MypUYntD3OBtLZh+0H6BjMCuL4ny8F6/BTbAri+FGuCPu0aPb47qovqQru+HNeAfurx+UzDao3v0rDD89faup+hW4Hs4olsSL0bu/p/QnPBFnBLrIus14F2Ioz8HR441Rc7gvjpatsJlt5fYtVCc8StSLe42WmiQ8jhoeer9PoYZxo0P35m/Ra/Cp2KDh2OvoxfWtOuTRsQN6jX0VLUegF9u3+gaNjraLdz1adkUvtm/fx9FxNnqNPQstc9GLTeHyOCraOkJdVIsuvhebwq1x4lgND8LdsesS0jPoNXQ7tOh24sWm8BDsglZdNAbfG5fTD/pmF/wCmxPUet2KGMtnGDawcRW0eGnKVJ6JsWg16V1sjlXqtPf8yZsYnqDULC8G5a3tsVJvnMcH6MWn8AaM5RG0x9+JvaFPnf0D8jGMQVk67/hn0aKvoxebyqcwli/RHv829opSjfaPKOkfg+6D9lipFKllS/RiU/k5xvI02uMfxF5RJxiWZOletRbGcAaGJ9forZgfgF5sSr1+wkMLE99gc5zeJOVvekedwWl4NHbpCK/DsGGNR6JFr+/FplSz1liUIjgZT0DVskwUmup6DfTKuewa5BAejqPgPfQa6N16HkIvNqVjKPr5u2jcW7L6Dj28YWRqb8Pi2Ry9xr2MliXwV/TiU/oiFs9+6DXubrSoiNGLTa3y5MVzCnqNOx8tKir3YodwbSwa1VN4DTsOLSrE8WKHULmconkAvYapkshyIXqxQ3gsFk3b+p+X9cpZ7+HdyopBOetf0DZKU3lvqf8VtLFDqTe5WDZAr1GvoUWFiEOWGlhV7lAse6LXKG1VsKjX92KHsu1bVgTHo9eoy9CivIcXO6TawVAkbaMI7Rm0HIVe7JBm3Ryqr//VqIvWtcj8HvQapIVNixI7XuyQahzfBY29NU+4CP9XXlqTivBEfkAtS8XSNorw3jBtMPJih/QSjOVQDJNlusfvhNPiUwxPRN6FsXijiN9QdXgWrR/a2KH1Ouk2tAJuj38YO6NdsLoo9sW0bhZD2yiibTFTy0Je/JBqchXLj2iPn/YQ8Qm0LxabJG8bRWjJ3qJtwF7s0CpFq1RtDPehPV7bpqeFtrGF91nNnpbBGNpGEepYLXrAiRebw40xhnVQD2dpjtPKUJd11P+gQfxmqEXJLrSNIrz9I3PQi81hl+J0bf3TtdEMOBtto4jb0XIVerE5DIvii6BtFKE9LIdhg56TFNaL5FZvelGEBZGeqnzShh3vdzl9FIuhrVavBFWBVQzqub1GlGDWx0V0RU9w0XTda8ik+zwWxXnoNWTSPRiLQuNvjZnD6stJ9kPUzrFiUQJJkx0N6idV5WVGu125UqlUKpXRsDoqU/cxKr8xNrVbQQvT2Z/C3rb1eGxmzeq1VfOPUa0RZhtr63Hw3kmNUT3KLduFVmGiNt97JzY2r8WsrInaeJ76aYy5VCev1e3YRelKpVKpVCqVSqVSqVQqlUqlL6am/gISwukjRO+H0wAAAABJRU5ErkJggg=="}} />
          </Left>
          <Body>
            <Text>{this.props.emergency.fetchedDataName}</Text>
            <Text note numberOfLines={1}>{this.props.emergency.fetchedDataDes}</Text>
          </Body>
          <Right>
                <Anchor href={this.props.emergency.fetchedDataLink}><Ionicons style={{color: '#4286F4'}} name='md-globe' size={responsiveFontSize(3)}/></Anchor>
          </Right>
          {this.props.userRole == 'superadmin' ?
              <Right>
              <Icon name='md-trash' onPress={() => this.props.onDataDeletion()}/>
              </Right>
              :
              <Right></Right>
          }
          

        </ListItem>
      
      );
    }
  }
  
  export default ListEmergency;