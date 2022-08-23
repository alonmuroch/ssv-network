// const { expect } = require("chai");
// const { progressBlocks } = require('./utils');
// const operator_fee_block = 1;
//
// const operatorsIndexes = Array.from(Array(1000).keys()).map(k => k + 1);
// let sharePKs, encryptedShares
// let validatorData = []
//
// describe("Stress Test", () => {
//     var deployedRegistryContract
//     beforeEach(async () => {
//         const Registry = await ethers.getContractFactory("SSVRegistryNew");
//         deployedRegistryContract = await Registry.deploy();
//         await deployedRegistryContract.deployed();
//         validatorData = []
//
//         // Create 1000 operators
//         for (let i = 0; i < operatorsIndexes.length; i++) {
//             const encryptionPK = "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000002644c5330744c5331435255644a54694253553045675546564354456c4449457446575330744c533074436b314a53554a4a616b464f516d64726357687261556335647a424351564646526b464254304e425554684254556c4a516b4e6e53304e42555556424e5756554e557777563068365a54647954575a506232787456484d4b64577449513245344b336474625577324f54464a5131527052454531556b4a31546b787153565132576b4530597a4d78635652495933464256486c3565566b774c7a6b3352336c4b5a32646f596e6c465232526f5a516f76616c6836615756544f584a325279744a56474631516a684d566c686b656b78475956517857455a5765466c6e4e327832546c42344f5552504c315a6f526b686b5757786e54334932643052745633466a52476f33436c68575557464f57454674526e67334e6a56514e546c584e585a7a564752585657464852577858536d3933536b5a4b646e6332556c5249536b5a315456686a537a5a5661574a3063555a4d536d4a774f57356b6455674b516a6c4c537a4e57636d59725a6d744a4f5752425a327478524446484f456c785130744b4d566c33626a557965477878625452434e69744f4f475a555a45314d53314a75635770465a6d527a563164774d46567a4d51704c54573976535863796333426f6158417a5546704e596e4a61615530774e6a4a325a556f3055336f76596a424f62576450546e685464304a4a546e4e7863473534516a68465556517853544e6a4e6b6c714e586868436d35525355524255554643436930744c5330745255354549464a545153425156554a4d53554d675330565a4c5330744c53304b00000000000000000000000000000000000000000000000000000000";
//             await deployedRegistryContract.registerOperator(encryptionPK, operator_fee_block);
//         }
//         sharePKs = Array.from(Array(10).keys()).map(k => `0xa20a622ecbc816c89896f92a18214905a57beedbe8df6120ba644453a7e35672a365c3b73ce35b8738eeb5dade9107d${k}`);
//         encryptedShares = Array.from(Array(10).keys()).map(k => `0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000158513741566f733037584a4537767275644b366c7a647a76634143313563636b5152492b6143766f31617a374979787a517233506a4361632b545745394d45307a4f6d49${k}36947472f46312f38613556786d71383948366e6b71436130415573782b37326c43306f686a4b3874396853746953746732596e2b304d2f4e3732744c6d5951394c325976654c56564a35556c586a425777${k}4377a5537732f3142435653727862415431376f2f704858474c46644170697a4c5332704b48354b71746545786e3033566b4a4244527538596c5055334634656c554937697a667a474444626d49677536484862305777344669743745543745422f357056457a547279445a5179516753336a4858714d63637359396e52494250724f2f2f367370544736646e5831304e4872356b716a305136464b64684d6a4162644d43773966527274672b72766979584e6674464945445478304768314f513d3d0000000000000000`);
//
//         // Deposit to the account
//         await deployedRegistryContract.deposit("100000000000")
//     })
//
//     it("Register 1000 validators", async () => {
//         // Register 1000 validators
//         for (let i = 1000; i < 2000; i++) {
//             const randomOperator = Math.floor(Math.random() * 995)
//             const validatorPK = `0xa7ae1ea93b860ca0269ccca776b4526977395aa194e5820a00dedbf1cd63e7a898eec9a12f539f733ea4df9c651f${i}`
//
//             const registerResult = (await (await deployedRegistryContract.registerValidator(
//                 [randomOperator, randomOperator + 1, randomOperator + 2, randomOperator + 3],
//                 validatorPK,
//                 sharePKs.slice(0, 4),
//                 encryptedShares.slice(0, 4),
//                 "10000"
//             )).wait()).logs[0]
//
//             // Save validator group id emits
//             const interfaceRegister = new ethers.utils.Interface(['event ValidatorAdded(bytes validatorPK, bytes32 groupId)']);
//             const outputRegister = interfaceRegister.decodeEventLog('ValidatorAdded', registerResult.data, registerResult.topics);
//             validatorData.push({ publicKey: validatorPK, groupId: outputRegister.groupId })
//         }
//     })
//
//     /*
//     it("Update 1000 operators", async () => {
//         for (let i = 0; i < operatorsIndexes.length; i++) {
//             await deployedRegistryContract.updateOperatorFee(operatorsIndexes[i], 10)
//         }
//     })
//
//     it("Update 30 validators", async () => {
//         for (let i = 1000; i < 1030; i++) {
//             const randomOperator = Math.floor(Math.random() * 995)
//             const validatorPK = `0xa7ae1ea93b860ca0269ccca776b4526977395aa194e5820a00dedbf1cd63e7a898eec9a12f539f733ea4df9c651f${i}`
//             await deployedRegistryContract.updateValidator(
//                 [randomOperator, randomOperator + 1, randomOperator + 2, randomOperator + 3],
//                 validatorPK,
//                 validatorData[i - 1000].groupId,
//                 sharePKs.slice(0, 4),
//                 encryptedShares.slice(0, 4),
//                 "10"
//             )
//         }
//     })
//
//     it("Remove 1000 operators", async () => {
//         for (let i = 0; i < operatorsIndexes.length; i++) {
//             await deployedRegistryContract.removeOperator(operatorsIndexes[i])
//         }
//     })
//
//     it("Remove 1000 validators", async () => {
//         for (let i = 0; i < validatorData.length; i++) {
//             await deployedRegistryContract.removeValidator(validatorData[i].publicKey, validatorData[i].groupId)
//         }
//     })
//     */
// });
