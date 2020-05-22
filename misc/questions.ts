import { Question } from "../shared/interfaces/question.interface";

const easyQuestions: Question[] = [
    {
        description : "O tráfego em ambas direções, mas não simultanêamente, é característica de qual tipo de transmissão?",
        alternatives : [
            'a) Half-Duplex',
            'b) Simplex',
            'c) Ponto-a-ponto',
            'd) Full-Duplex'
        ],
        correctAnwserIndex: 1
    },

    {
        description : "Qual é o comando usado para ver se uma máquina acessa a outra?",
        alternatives : [
            'a) trace route',
            'b) ipconfig',
            'c) ping',
            'd) exec'
        ],
        correctAnwserIndex: 3
    },

    {
        description : "Em quantas camadas se divide o modelo de referência OSI?",
        alternatives : [
            'a) 5',
            'b) 8',
            'c) 3',
            'd) 7'
        ],
        correctAnwserIndex: 4
    },

    {
        description : "Quais são os protocolos mais importantes da camada de Transporte?",
        alternatives : [
            'a) TCP e UDP',
            'b) HTTP e SMTP',
            'c) UDP e SMTP',
            'd) TCP e HTTP'
        ],
        correctAnwserIndex: 1
    },

    {
        description : "A qual camada pertence o protocolo IP?",
        alternatives : [
            'a) Aplicação',
            'b) Rede',
            'c) Transporte',
            'd) Enlace'
        ],
        correctAnwserIndex: 2
    }
]

const mediumQuestions: Question[] = [
    {
        description : "Em qual protocolo o campo de Checksum é opcional?",
        alternatives : [
            'a) TCP',
            'b) HTTP',
            'c) IP',
            'd) UDP'
        ],
        correctAnwserIndex: 4
    },

    {
        description : "Quantas camadas tem o modelo padrão TCP/IP?",
        alternatives : [
            'a) 5',
            'b) 2',
            'c) 4',
            'd) 3'
        ],
        correctAnwserIndex: 3
    },

    {
        description : "Qual o significado do comando NOOP do SMTP?",
        alternatives : [
            'a) Envia o conteúdo da mensagem',
            'b) Identifica o destinatário da mensagem',
            'c) Verifica o endereço de e-mail de um servidor',
            'd) O servidor responde com OK reply code'
        ],
        correctAnwserIndex: 4
    },

    {
        description : "Não é um estado do POP:",
        alternatives : [
            'a) Identificação',
            'b) Autorização',
            'c) Transação',
            'd) Atualização'
        ],
        correctAnwserIndex: 1
    },

    {
        description : "A conectividade traz problemas de segurança, que podem ser minimizados com ____?",
        alternatives : [
            'a) POP',
            'b) NAT',
            'c) DHCP',
            'd) ISMT'
        ],
        correctAnwserIndex: 2
    }
]

const hardQuestions: Question[] = [
    {
        description : "No DNS é errado afirmar que:",
        alternatives : [
            'a) Não existe nenhum repositório central que contenha informações sobretodos os computadores ligados à Internet.',
            'b) É composto de um banco de dados de serviços.',
            'c) Para cada domĩnio têm-se um arquivo de zona',
            'd) Servidores tem “autoridade” para o domínio.'
        ],
        correctAnwserIndex: 2
    },

    {
        description : "Qual dos itens abaixo não é uma métrica de roteamento?",
        alternatives : [
            'a) Path length',
            'b) Load',
            'c) Bandweight',
            'd) Reability'
        ],
        correctAnwserIndex: 3
    },

    {
        description : "Qual dos itens abaixo não faz parte do cabeçalho do pacote ICMP?",
        alternatives : [
            'a) Timestamp',
            'b) Type',
            'c) Checksum',
            'd) Code'
        ],
        correctAnwserIndex: 1
    },

    {
        description : "No cabeçalho do protocolo IPv6:",
        alternatives : [
            'a) O Next Header identifica o cabeçalho de expansão que segue o atual',
            'b) O Flow Label identifica pacotes do mesmo fluxo de comunicação',
            'c) O Priority indica a prioridade de cada datagrama',
            'd) O Payload Length indica o tamanho, em Bytes, apenas dos dados enviados junto ao cabeçalho IPv6.'
        ],
        correctAnwserIndex: 1
    },

    {
        description : "Qual dos itens abaixo é um elemento de serviço do nível de aplicação?",
        alternatives : [
            'a) RISE',
            'b) ACSI',
            'c) RTSE',
            'd) CSTM'
        ],
        correctAnwserIndex: 3
    }
]

export{easyQuestions};
export{mediumQuestions};
export{hardQuestions};
