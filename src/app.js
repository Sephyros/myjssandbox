// import {NFCes, UFCodes, corporations, NFCEModels, emissionTypes} from provisoryDB
const invalidMessage = (coisa, atNFCe, expected) =>
  `(${coisa} inválido)\n\tNFCe     :\t${atNFCe}\n\tEsperado :\t${expected}`;

const validateUF = (NFCe) => {
  const UFNumber = Number(NFCe.slice(0, 2));
  const expectedUF = UFCodes.find((UF) => UF.code === UFNumber).initialism;
  const CNPJ = NFCe.slice(6, 20);
  const corporate = getCorporationByCNPJ(CNPJ);
  const corporateUF =
    corporate === undefined ? "Nenhum (empresa não encontrada)" : corporate.uf;
  return expectedUF === corporateUF
    ? `(UF Válido)`
    : invalidMessage("UF", expectedUF, corporateUF);
};
const getCorporationByCNPJ = (CNPJ) =>
  corporations.find((corporate) => corporate.cnpj === CNPJ);

const validateCNPJ = (NFCe) => {
  const CNPJ = NFCe.slice(6, 20);
  return corporations.some((corporate) => corporate.cnpj === CNPJ)
    ? "(CNPJ Válido)"
    : "Empresa não encontrada";
};

const validateModel = (NFCe) => {
  const expectedNFCeModel = NFCe.slice(20, 22);
  const actualNFCeModel = NFCEModels.find(
    (model) => model.code === Number(expectedNFCeModel)
  );
  if (!actualNFCeModel) {
    return invalidMessage(
      "Modelo",
      expectedNFCeModel,
      NFCEModels.reduce((acc, model, index, array) => {
        return (acc += `${model.code}${
          index < array.length - 1
            ? `${index < array.length - 2 ? ", " : " ou "}`
            : ""
        }`);
      }, "")
    );
  }
  return `(Modelo Válido: ${actualNFCeModel.type})`;
};

const validateDocumentSeries = (NFCe) => {
  const NFCeDocumentSeries = NFCe.slice(22, 25);
  const expectedDocumentSeries =
    Number(NFCeDocumentSeries) >= 1 && Number(NFCeDocumentSeries) <= 899;
  return expectedDocumentSeries
    ? `(Série válida)`
    : invalidMessage("Série", "001 < x < 899", NFCeDocumentSeries);
};

const validateNumber = (NFCe) => {
  const actualNFCeNumber = NFCe.slice(25, 34);
  const expectedNFCeNumber =
    Number(actualNFCeNumber) >= 1 && Number(actualNFCeNumber) <= 999999999;
  return expectedNFCeNumber
    ? `(Número válido)`
    : invalidMessage("Número", "1 < x < 999.999.999", actualNFCeNumber);
};
const validateEmission = (NFCe) => {
  const expectedNFCeEmissionType = NFCe.slice(34, 35);
  const NFCeModelType = "NFC-e";
  const actualNFCeEmissionType = emissionTypes[NFCeModelType].find(
    (emission) => emission.code === Number(expectedNFCeEmissionType)
  );
  if (!actualNFCeEmissionType) {
    return invalidMessage(
      "Emissão",
      expectedNFCeEmissionType,

      emissionTypes[NFCeModelType].reduce((acc, emission, index, array) => {
        return (acc += `${emission.code}${
          index < array.length - 1
            ? `${index < array.length - 2 ? ", " : " ou "}`
            : ""
        }`);
      }, "")
    );
  }
  return `(Emissão Válida: ${actualNFCeEmissionType.type})`;
};

const validateCode = (NFCe) => {
  NFCe.slice(35, 43);
};

const validateVerificationDigit = (NFCe) => {
  const NFCeVD = NFCe.slice(NFCe.length - 1);
  const NFCeExpectedVD = createVerificationDigitForNFCE(NFCe);
  return NFCeVD === NFCeExpectedVD
    ? `(DV válido)`
    : invalidMessage("DV", NFCeVD, NFCeExpectedVD);
};

const createVerificationDigitForNFCE = (NFCe) => {
  if (NFCe.length === 44) {
    NFCe = NFCe.slice(0, 43);
  }

  const NFCeNumbers = NFCe.split("").map((value) => Number(value));
  const valuesSum = NFCeNumbers.reduce((acc, number, index) => {
    const indexMutiplicators = [
      [0, 8, 16, 24, 32, 40],
      [1, 9, 17, 25, 33, 41],
      [2, 10, 18, 26, 34, 42],
      [3, 11, 19, 27, 35],
      [4, 12, 20, 28, 36],
      [5, 13, 21, 29, 37],
      [6, 14, 22, 30, 38],
      [7, 15, 23, 31, 39],
    ];

    if (indexMutiplicators[2].includes(index)) {
      number = number * 2;
    }

    if (indexMutiplicators[1].includes(index)) {
      number = number * 3;
    }

    if (indexMutiplicators[0].includes(index)) {
      number = number * 4;
    }

    if (indexMutiplicators[7].includes(index)) {
      number = number * 5;
    }

    if (indexMutiplicators[6].includes(index)) {
      number = number * 6;
    }

    if (indexMutiplicators[5].includes(index)) {
      number = number * 7;
    }

    if (indexMutiplicators[4].includes(index)) {
      number = number * 8;
    }

    if (indexMutiplicators[3].includes(index)) {
      number = number * 9;
    }
    const accSum = (acc += number);
    return accSum;
  }, 0);

  const mod11 = valuesSum % 11;
  if (mod11 % 11 === 1 || mod11 === 0) {
    return "0";
  }

  const modSubtraction = 11 - mod11;

  return String(modSubtraction);
};

const validateNFCe = (NFCe) => {
  const NFCeUF = NFCe.slice(0, 2);
  const NFCeYear = NFCe.slice(2, 4);
  const NFCeMonth = NFCe.slice(4, 6);
  const NFCeCNPJ = NFCe.slice(6, 20);
  const NFCeModel = NFCe.slice(20, 22);
  const NFCeSeries = NFCe.slice(22, 25);
  const NFCeNumber = NFCe.slice(25, 34);
  const NFCeEmission = NFCe.slice(34, 35);
  const NFCeCode = NFCe.slice(35, 43);
  const NFCeVD = NFCe.slice(43, 44);
  console.log(
    `---------------------------------------------------
${NFCe}

UF           :\t${NFCeUF} ${validateUF(NFCe)}
ANO          :\t${NFCeYear} ${"(Ano válido)"}
MẼS          :\t${NFCeMonth} ${"(Mês válido)"}
CNPJ         :\t${NFCeCNPJ} ${validateCNPJ(NFCe)}
MODELO       :\t${NFCeModel} ${validateModel(NFCe)}
SÉRIE        :\t${NFCeSeries} ${validateDocumentSeries(NFCe)}
NÚMERO       :\t${NFCeNumber} ${validateNumber(NFCe)}
EMISSÃO      :\t${NFCeEmission} ${validateEmission(NFCe)}
CÓDIGO       :\t${NFCeCode} ${"(Código válido)"}
DÍG. VERIF.  :\t${NFCeVD} ${validateVerificationDigit(NFCe)}
---------------------------------------------------`
  );
};

const MyNFCes = [...NFCes];

MyNFCes.forEach((NFCe) => {
  validateNFCe(NFCe);
});
