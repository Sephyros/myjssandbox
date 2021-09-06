const NFCes = [
  "35210100306597004518657770000037379000142321",
  "33180700357556000137657620000019191000001009",
];

const UFCodes = [
  { code: 11, name: "Rondônia", initialism: "RO" },
  { code: 12, name: "Acre", initialism: "AC" },
  { code: 13, name: "Amazonas", initialism: "AM" },
  { code: 14, name: "Roraima", initialism: "RR" },
  { code: 15, name: "Pará", initialism: "PA" },
  { code: 16, name: "Amapá", initialism: "AP" },
  { code: 17, name: "Tocantins", initialism: "TO" },
  { code: 21, name: "Maranhão", initialism: "MA" },
  { code: 22, name: "Piauí", initialism: "PI" },
  { code: 23, name: "Ceará", initialism: "CE" },
  { code: 24, name: "Rio Grande do Norte", initialism: "RN" },
  { code: 25, name: "Paraíba", initialism: "PB" },
  { code: 26, name: "Pernambuco", initialism: "PE" },
  { code: 27, name: "Alagoas", initialism: "AL" },
  { code: 28, name: "Sergipe", initialism: "SE" },
  { code: 29, name: "Bahia", initialism: "BA" },
  { code: 31, name: "Minas Gerais", initialism: "MG" },
  { code: 32, name: "Espírito Santo", initialism: "ES" },
  { code: 33, name: "Rio de Janeiro", initialism: "RJ" },
  { code: 35, name: "São Paulo", initialism: "SP" },
  { code: 41, name: "Paraná", initialism: "PR" },
  { code: 42, name: "Santa Catarina", initialism: "SC" },
  { code: 43, name: "Rio Grande do Sul", initialism: "RS" },
  { code: 50, name: "Mato Grosso do Sul", initialism: "MS" },
  { code: 51, name: "Mato Grosso", initialism: "MT" },
  { code: 52, name: "Goiás", initialism: "GO" },
  { code: 53, name: "Distrito Federal", initialism: "DF" },
];

const corporations = [
  {
    cnpj: "00306597004518",
    nickname: "Placeholder Inc.",
    uf: "SP",
    companyName: "Placeholder Inc.",
    fantasyName: "Placeholder Inc.",
    stateRegistration: "-",
  },
  {
    cnpj: "00357556000137",
    nickname: "Fake Corp",
    uf: "RJ",
    companyName: "Fake Corp",
    fantasyName: "Fake Corp",
    stateRegistration: "-",
  },
];

const NFCEModels = [
  { code: 65, type: "NFC-e" },
  { code: 55, type: "NF-e" },
  { code: 57, type: "CT-e" },
  { code: 25, type: "MDF-e" },
];

const emissionTypes = {
  "NF-e": [
    { code: 1, type: "Emissão Normal" },
    { code: 2, type: "Contingência em Formulário de Segurança" },
    { code: 3, type: "Contingência SCAN (desativado)" },
    { code: 4, type: "Contingência EPEC" },
    { code: 5, type: "Contingência em Formulário de Segurança FS-DA" },
    { code: 6, type: "Contingência SVC-AN" },
    { code: 7, type: "Contingência SVC-RS" },
  ],
  "NFC-e": [
    { code: 1, type: "Emissão normal (não em contingência)" },
    {
      code: 4,
      type: "Contingência EPEC (Evento Prévio da Emissão em Contingência)",
    },
    { code: 9, type: "Contingência off-line da NFC-e" },
  ],
};
