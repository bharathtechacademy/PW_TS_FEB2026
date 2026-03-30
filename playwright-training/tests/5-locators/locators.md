# WebElement : Element displayed in the UI. 
# Locator : The default method provided by Playwright to identify the location of web elements. 

## There are 9 different locator strategies we have to identify the location of web elements within the playwright.  

//1.getByRole()
//2.getByLabel()
//3.getByPlaceholder()
//4.getByText()
//5.getByAltText()
//6.getByTitle()
//7.getByTestId()
//8.locator() (css )
//9.locator() (xpath)

# Syntax to Locate Element
const element = page.locatorMethod("locator-value");


# 1. getByRole() :This locator method is going to identify the location of a web element based on the nature of the element and its respective attribute values. 

## Syntax : page.getByRole(role, option) ;
/*
* role = 'textbox' for text box , option = placeholder /aria-label
* role = 'button' for button , option = text / value
* role = 'link' for hyperlink , option = text
* role = 'combobox' for dropdown , option = text
* role = 'checkbox' for checkbox , option = text
* role = 'radio' for radio button , option = text
* role = 'switch' for toggle button , option = text
* role = 'heading' for heading , option = text
* role = 'list' for list, option = text
*/


<textarea jsname="yZiJbe" class="gLFyf" aria-controls="Alh6id" aria-owns="Alh6id" autofocus="" title="Search" value="" aria-label="Search" placeholder="" aria-autocomplete="both" aria-expanded="false" aria-haspopup="false" autocapitalize="off" autocomplete="off" autocorrect="off" id="APjFqb" maxlength="2048" name="q" role="combobox" rows="1" spellcheck="false" data-ved="0ahUKEwiGsYKizsaTAxX4ZmwGHThtM-0Q39UDCAs" aria-activedescendant="" style=""></textarea>

const googleSearchBox = page.getByRole('textbox' ,{name : 'Search'})

<input required="" autocomplete="off" placeholder="First Name" id="firstName" class=" mr-sm-2 form-control" type="text">

const firstName = page.getByRole('textbox' ,{name : 'First Name'})

<button data-v-10d463b7="" data-v-0af708be="" type="submit" class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"><!----> Login <!----></button>

const loginBtn = page.getByRole('button' ,{name : 'Login'})

<input type="submit" class="button" value="Log In">

const loginBtn = page.getByRole('button' ,{name : 'Log In'})

<a class="gb_Z" aria-label="Gmail " data-pid="23" href="https://mail.google.com/mail/&amp;ogbl" target="_top">Gmail</a>

const gmailLink = page.getByRole('link' ,{name : 'Gmail'})

<td colspan="1" align="center" width="50%">
			  <input id="accessMode1" name="accessMode" class="input" type="radio" value="soap"><br>SOAP<br>&nbsp;
			</td>

  const soapRadioBtn = page.getByRole('radio' ,{name : 'SOAP'})          

  <select id="loanProvider" name="loanProvider" class="input">							
						<option value="jms">JMS</option>						
						<option value="ws" selected="selected">Web Service</option>					
						<option value="local">Local</option>					
				</select>

const loanProviderDropdown = page.getByRole('combobox').selectOption('Web Service')   


# 2.getByLabel() => label element text value
## Syntax : page.getByLabel('label-element-textvalue')
//Example Html :  <label class="form-label" id="dateOfBirth-label">Date of Birth</label>
const dob = page.getByLabel('Date of Birth')

# 3.getByPlaceholder() => any element placeholder attribute value
<input required="" autocomplete="off" placeholder="First Name" id="firstName" class=" mr-sm-2 form-control" type="text">
const firstName = page.getByPlaceholder('First Name');

# 4.getByText() => any element text value
<a class="gb_Z" aria-label="Gmail " data-pid="23" href="https://mail.google.com/mail/&amp;ogbl" target="_top">Gmail</a>
const gmailLink = page.getByText('Gmail');

# 5.getByAltText() => any element alt attribute value
<img src="images/logo.gif" alt="ParaBank" width="136" height="31" border="0" class="logo" title="ParaBank">
const logo = page.getAltText('ParaBank')

# 6.getByTitle() => any element title attribute value
<a href="#" title="Home Page">Home</a>
const homePageTitle = page.getByTitle('Home Page');

# 7.getByTestId() => any element testId/data-testId attribute value
<a href="#" data-testid="Home Page">Home</a>
const homePageTitle = page.getByTestId('Home Page');

# 8.locator ==> Locate the element by using CSS (no //) or XPath (starts with //)