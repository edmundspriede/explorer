angular.module('ethExplorer')
    .controller('mainCtrl', function ($rootScope, $scope, $location) {

	var web3 = $rootScope.web3;
	var maxBlocks = 50; // TODO: into setting file or user select
	var blockNum = $scope.blockNum = parseInt(web3.eth.blockNumber, 10);
	if (maxBlocks > blockNum) {
	    maxBlocks = blockNum + 1;
	}

	// get latest 50 blocks
	$scope.blocks = [];
	for (var i = 0; i < maxBlocks; ++i) {
	    $scope.blocks.push(web3.eth.getBlock(blockNum - i));
	}
        
        $scope.blocks.forEach(prepareBlocks);
        
        
       
        
	
        $scope.processRequest = function() {
             var requestStr = $scope.ethRequest.split('0x').join('');

            if (requestStr.length === 40)
              return goToAddrInfos(requestStr)
            else if(requestStr.length === 64) {
              if(/[0-9a-zA-Z]{64}?/.test(requestStr))
                return goToTxInfos('0x'+requestStr)
              else if(/[0-9]{1,7}?/.test(requestStr))
                return goToBlockInfos(requestStr)
            }else if(parseInt(requestStr) > 0)
              return goToBlockInfos(parseInt(requestStr))

            alert('Don\'t know how to handle '+ requestStr)
        };


        function goToBlockInfos(requestStr) {
            $location.path('/block/'+requestStr);
        }

        function goToAddrInfos(requestStr) {
            $location.path('/address/'+requestStr);
        }

         function goToTxInfos (requestStr) {
             $location.path('/transaction/'+requestStr);
        }
        
        
         function prepareBlocks(item , index) {
            
            // pool A
            if (item.miner == 0x3be27a1781bf709b38f7764f9dfc6951dad3050c) {
                
               $scope.blocks[index].class = 'poola';  
               $scope.blocks[index].name = 'poola'; 
            }
            
            
            // pool B
            if (item.miner == 0xb2d1942aa9fcdd5f5d11152fa06dfe754416fba5) {
                
               $scope.blocks[index].class = 'poolb';  
               $scope.blocks[index].name = 'poolb';  
               
            }
            
             $scope.blocks[index].extrareadable = hex2a(item.extraData);
             
             var blockdate = new Date(item.timestamp * 1000);
             $scope.blocks[index].datetime = blockdate.toGMTString();
        }

    });
