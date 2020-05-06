import openpyxl

from sqlalchemy import create_engine


def read_xls(file_):
    wb_obj = openpyxl.load_workbook(file_)
    return wb_obj.active


def insert_data(sheet, db_connect):
    conn = db_connect.connect()
    for row in sheet.iter_rows(min_row=2, max_col=9):
        title = row[0].value
        preparation = row[1].value
        description = row[2].value
        age_min = int(row[3].value.split('-')[0])
        age_max = int(row[3].value.split('-')[1])
        duration = row[4].value
        didactic = float(str(row[5].value).replace('%', ''))
        movement = float(str(row[6].value).replace('%', ''))
        creativity = float(str(row[7].value).replace('%', ''))
        relaxing = float(str(row[8].value).replace('%', ''))

        print(preparation)
        print(description)

        try:
            conn.execute('insert into activities ('
                         'title, preparation, description, age_min, age_max, duration, '
                         'didactic, movement, creativity, relaxing, activity_id)  '
                         'values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, null)',
                         title, preparation, description, age_min, age_max, duration,
                         didactic, movement, creativity, relaxing)
        except Exception as e:
            print(e)


if __name__ == '__main__':
    xlsx_file = 'euvsvirus_emily_activities.xlsx'
    db_connect = create_engine('sqlite:///../emily.db')

    xls_sheet_data = read_xls(file_=xlsx_file)
    insert_data(sheet=xls_sheet_data, db_connect=db_connect)
