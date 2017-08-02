exports.NewAsync = function(gen){
	//控制器 實例
	var _co = {}
	
	//Generator
	var _gen = gen(_co);

	//流程 結束時 回調
	var _callback;
	

	//輔助函數 進入下個 流程
	//data	yield 返回值
	//err	如果爲 true 拋出異常 終止流程  
	var next = function(err,data){
		if(err) {
			_gen.throw(err);
			if(_callback){
				_callback(err);
			}
			return;
		} 

		//執行 next
		var res = _gen.next(data);
		
		if(res.done){
			//通知 所有流程 執行完
			if(_callback){
				_callback(null,res.value);
			}
		} 
	};

	/***	導出函數	***/
	//執行 流程
	//callback	可選參數 流程結束 回調
	_co.Do = function(callback){
		_callback = callback;
		next();
	};
	//停止流程 並使 yield 拋出 err 異常
	_co.Throw = function(err){
		if(!err){
			next("kill async");
			return;
		}
		next(err);
	};

	//通知 當前流程 完成 進入下個流程  
	//將 data 作爲 yield 的返回值 返回
	_co.Notify = function(data){
		next(null,data);
	};
	return _co;
};