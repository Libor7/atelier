<?php 

  /**
   *  Prevents direct access to file 
   */

  if (basename($_SERVER['PHP_SELF']) == basename(__FILE__)) {
    exit('Direct access denied');
  }


 /**
  *  Class Database manages database connection and queries 
  */

  class Database {

    private $connection;
    private static $server_name = 'localhost';
    private static $db_username = 'root';
    private static $db_password = '';
    private static $db_name = 'atelier';

    protected $table_content = [];
    protected $table_content_filtered = [];

    public function __construct() {
      $this->connection = new mysqli(self::$server_name, self::$db_username, self::$db_password, self::$db_name);
      $this->connection->set_charset('utf8mb4');
    }

    /**
     *  Closes database connection 
     */

    public function disconnect() {
      $this->connection->close();
    }

    /**
     *  Returns all records from table 
     *
     *  @param	string	tablename
     *  @param	string	comma separated list of columns 
     *  @return	object 
     */

    protected function select($table, $columns = '*') {
      $query = 'SELECT ' . $columns . ' FROM ' . $table . ';';
      $records = $this->connection->query($query);

      while ($record = $records->fetch_assoc()) {
        $this->table_content[] = $record;
      }
      return $this;
    }

    /**
     *  Adds where clause to query 
     *
     *  @param	string	columnname 
     *  @param	mixed	columnvalue 
     *  @param	string	operator 
     *  @param	array	filtered content 
     *  @return	object 
     */

    protected function where($column, $value, $operator, $to_filter) {
      $this->table_content_filtered = array_filter($to_filter, function($item) use ($column, $value, $operator) {
        switch ($operator) {
          case '==':
            return $item[$column] == $value;
            break;
          case '>':
            return $item[$column] > $value;
            break;
          case '<':
            return $item[$column] < $value;
            break;
          case '>=':
            return $item[$column] >= $value;
            break;
          case '<=':
            return $item[$column] <= $value;
            break;
          case '<>':
            return $item[$column] <> $value;
            break;
          case 'LIKE':
            return strpos(strtolower($this->to_ascii($item[$column])), strtolower($this->to_ascii($value))) !== false;
            break;
        }
      });
      return $this;
    }

    /**
     *  Converts characters into format compatible with ASCII 
     *
     *  @param	string 
     *  @return	string formatted into ASCII 
     */

     private function to_ascii($str) {
       $chars = array('ä'=>'a', 'Ä'=>'A', 'á'=>'a', 'Á'=>'A', 'č'=>'c', 'Č'=>'C', 'ď'=>'d', 'Ď'=>'D', 'ě'=>'e', 'Ě'=>'E', 
'é'=>'e', 'É'=>'E', 'ë'=>'e', 'Ë'=>'E', 'í'=>'i', 'Í'=>'I', 'ľ'=>'l', 'Ľ'=>'L', 'ĺ'=>'l', 'Ĺ'=>'L', 'ň'=>'n', 'Ň'=>'N',     'ó'=>'o', 'Ó'=>'O', 'ö'=>'o', 'Ö'=>'O', 'ô'=>'o', 'Ô'=>'O', 'ř'=>'r', 'Ř'=>'R', 'ŕ'=>'r', 'Ŕ'=>'R', 'š'=>'s', 'Š'=>'S', 
'ť'=>'t', 'Ť'=>'T', 'ú'=>'u', 'Ú'=>'U', 'ü'=>'u', 'Ü'=>'U', 'ý'=>'y', 'Ý'=>'Y', 'ž'=>'z', 'Ž'=>'Z');

       return strtr($str, $chars);
     }

    /**
     *  Changes deleted to true 
     *
     *  @param	string	tablename 
     *  @param	number	id 
     *  @return	boolean	whether or not the query ran successfully 
     */

     public function delete($table, $id) {
       $query = 'UPDATE ' . $table . ' SET deleted = 1 WHERE id = ' . $id . ';';
       return $this->connection->query($query) ? true : false;
     }

  }
