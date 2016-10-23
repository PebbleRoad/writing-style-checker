import React from 'react'
import TextField from 'material-ui/TextField'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import Checkbox from 'material-ui/Checkbox'
import retext from 'retext'

import RaisedButton from 'material-ui/RaisedButton'


var profanities = require('retext-profanities')
var cliches = require('retext-cliches');
var contractions = require('retext-contractions');
var diacritics = require('retext-diacritics');
var english = require('retext-english');
var equality = require('retext-equality');
var indefiniteArticle = require('retext-indefinite-article');
var overuse = require('retext-overuse');
var passive = require('retext-passive');
var readability = require('retext-readability')
var sentiment = require('retext-sentiment');
var repeated = require('retext-repeated-words');
var simplify = require('retext-simplify')

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      text: "He was withheld while we were being fed. Donald Trump abandoned decades of tradition Thursday night with a tough takedown of Hillary Clinton at an annual charity dinner that prompted booing of the Republican presidential nominee.\nClinton\'s remarks, too, largely lacked the self-deprecating humor that is typical at the Al Smith dinner, which benefits Catholic charities and is often one of the final opportunities for presidential candidates to share a stage before the election.\nBut where Clinton's remarks singed, Trump's burned -- costing him an opportunity to take some of the heat off his campaign as it struggles through the final three weeks of the 2016 contest. Sorry to burst your bubble. Well, it does’nt have to be so bad yall, it isnt like the 80’s. Beyonce is the creme fresh on his resume. He should, a 8-year old boy, should have arrived a hour. That movie was amazing. The story was amazing, The acting was amazing. This product is not bad at all.",
      errors: [],
      modules: [],
    }
  }
  componentDidMount () {
    this.process()
  };
  process = () => {
    retext()
      .use(english)
      .use(passive)
      .use(readability)
      .use(sentiment)
      .use(repeated)
      .use(simplify)
      .use(profanities)
      .use(cliches)
      .use(contractions)
      .use(diacritics)
      .use(equality)
      .use(indefiniteArticle)
      .use(overuse)
      .process(this.state.text, (err, file) => {
        if (file) {
          this.setState({
            errors: file.messages
          })
        }
      })
  };
  onChange = (event) => {
    let value = event.target.value
    this.setState({
      text: event.target.value
    }, this.process)
  };
  render () {
    let { text } = this.state
    return (
      <div>
        <div className='row'>
          <div className='col-lg-6'>
            <TextField
              onChange={this.onChange}
              defaultValue={text}
              name='text'
              fullWidth
              multiLine
              rows={10}
              rowsMax={20}
            />
            <RaisedButton
              onClick={this.process}
              label='Check writing style'
              primary
            />
          </div>
          <div className='col-lg-6'>
            <Table
            >
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                style={{borderBottom: 'none'}}
              >
                <TableRow>
                  <TableHeaderColumn>Message</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                deselectOnClickaway={false}
                stripedRows={false}
                showRowHover={true}
              >
                {this.state.errors.map((err, idx) => {
                  let { message, location, ruleId } = err
                  return (
                    <TableRow key={idx}>
                      <TableRowColumn>
                        {ruleId
                          ? <span className='msg-ruleid'>{ruleId}</span>
                          : null
                        } {message}
                      </TableRowColumn>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>

          </div>
        </div>
      </div>
    )
  }
}