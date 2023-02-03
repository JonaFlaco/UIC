import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
  } from 'typeorm';
import { ProjectEntity,PlanningEntity,ModalityEntity,CatalogueEntity } from '@uic/entities';

  @Entity('enrollment', { schema: 'uic' })
  export class EnrollmentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn({
      name: 'created_at',
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
  
    @UpdateDateColumn({
      name: 'updated_at',
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
  
    @DeleteDateColumn({
      name: 'deleted_at',
      type: 'timestamptz',
      nullable: true,
    })
    deletedAt: Date;
  
  
    // Relationships falta mesh_students(IGNUG) 
    @ManyToOne(() => ModalityEntity, (modality) => modality.enrollments)
    @JoinColumn({ name: 'modality_id' })
    modality: ModalityEntity;

    @ManyToOne(() => PlanningEntity, (planning) => planning.enrollments)
    @JoinColumn({ name: 'planning_id' })
    planning: PlanningEntity;

    @OneToMany(() => ProjectEntity,(project) => project.enrollment)
    projects: ProjectEntity[];
   
    @ManyToOne(() => CatalogueEntity, (catalogue) => catalogue.enrollments)
    @JoinColumn({ name: 'state_id' })
    catalogue: CatalogueEntity;


    // Fields
    @Column('varchar', {
      name: 'code',
      unique:true,
      comment: 'codigo de inscripcion/matricula ej: 12SAD12',
    })
    code: string;
  
    @Column('varchar', {
      name: 'observation',
      comment: 'Comentario en caso de necesitar corregir un documento',
    })
    observation: string;
  
    // @Column('date', {
    //   name: 'registered_at',
    //   comment: 'fecha de la matricula',
    // })
    // registeredAt: Date;
  
  }
  