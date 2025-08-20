// Four major parties with sample candidates (name, party, symbol, constituency)
module.exports = [
  // NA (National Assembly) candidates for constituency X
  { id: 'na1', name: 'Ali Khan', party: 'PTI', symbol: 'Cricket Bat', constituency: 'NA-100' },
  { id: 'na2', name: 'Zulaikha Begum', party: 'PML-N', symbol: 'Tiger', constituency: 'NA-100' },
  { id: 'na3', name: 'Bilal Ahmed', party: 'PPP', symbol: 'Arrow', constituency: 'NA-100' },
  { id: 'na4', name: 'Saira Qureshi', party: 'MQM', symbol: 'Umbrella', constituency: 'NA-100' },

  // MPA (Provincial Assembly) candidates for the same area
  { id: 'mpa1', name: 'Faisal Ali', party: 'PTI', symbol: 'Cricket Bat', constituency: 'PP-100' },
  { id: 'mpa2', name: 'Razia Khan', party: 'PML-N', symbol: 'Tiger', constituency: 'PP-100' },
  { id: 'mpa3', name: 'Kamran Shah', party: 'PPP', symbol: 'Arrow', constituency: 'PP-100' },
  { id: 'mpa4', name: 'Muniza Rafiq', party: 'MQM', symbol: 'Umbrella', constituency: 'PP-100' },
];
